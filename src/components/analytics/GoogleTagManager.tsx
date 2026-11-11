const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

// Snippet base de GTM: crea dataLayer y deja el script de gtm.js como "lumayolazyloadscript" hasta que el loader lo active.
const gtmSnippet = `
            (function(w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
              });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', '${GTM_ID}');
          `;

// Loader lazy de GTM (portado de _document.tsx de Aviva): carga GTM con la primera interacción o a los 3.5 s.
const gtmLoader = `
            (() => {
              'use strict';

              class GTMLoader {
                constructor() {
                  this.version = '2.0.4';
                  this.gtmId = '${GTM_ID}';
                  this.loaded = false;
                  this.userActionTriggered = false;
                  this.firstMousemoveIgnored = false;
                  this.fallbackTimer = null;

                  // Eventos de interacción del usuario
                  this.triggerEvents = [
                    'keydown', 'keyup',
                    'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout',
                    'touchmove', 'touchstart', 'touchend', 'touchcancel',
                    'wheel', 'click', 'dblclick', 'input'
                  ];

                  this.userEventHandler = this.handleUserEvent.bind(this);
                  this.init();
                }

                // Método principal de inicialización
                init() {
                  window.dataLayer = window.dataLayer || [];
                  this.setupPageShowHide();

                  // Fix para dispositivos iOS (iPad/iPhone)
                  if (/iP(ad|hone)/.test(navigator.userAgent)) {
                    this.setupIOSTouchFix();
                  }

                  // Fallback por tiempo: si no hay interacción, cargar GTM a los 3.5 s (mide rebotes
                  // sin interacción). Se arma ANTES de captureUserEvents() para que, si la pestaña
                  // carga oculta y GTM se dispara de inmediato, el clearTimeout de triggerGTMScript()
                  // sí encuentre este timer y lo cancele (evita un timer huérfano).
                  this.fallbackTimer = setTimeout(() => this.triggerGTMScript(), 3500);

                  this.captureUserEvents();
                }

                // Configurar listeners para pageshow/pagehide
                setupPageShowHide() {
                  window.addEventListener('pageshow', event => {
                    this.persisted = event.persisted;
                  }, {
                    isGTM: true
                  });

                  window.addEventListener('pagehide', () => {
                    this.onFirstUserAction = null;
                  }, {
                    isGTM: true
                  });
                }

                // Fix para iOS: convertir touch en click real
                setupIOSTouchFix() {
                  let touchStart;

                  function saveTouchStart(event) {
                    touchStart = event;
                  }

                  window.addEventListener('touchstart', saveTouchStart, {
                    isGTM: true
                  });

                  window.addEventListener('touchend', function handleTouchEnd(event) {
                    // Validar que el touch fue un tap (no un swipe)
                    if (event.changedTouches[0] && touchStart?.changedTouches[0] &&
                      Math.abs(event.changedTouches[0].pageX - touchStart.changedTouches[0].pageX) < 10 &&
                      Math.abs(event.changedTouches[0].pageY - touchStart.changedTouches[0].pageY) < 10 &&
                      event.timeStamp - touchStart.timeStamp < 200) {

                      // Remover listeners
                      window.removeEventListener('touchstart', saveTouchStart, {
                        isGTM: true
                      });
                      window.removeEventListener('touchend', handleTouchEnd, {
                        isGTM: true
                      });

                      // No convertir si es un input de texto
                      if (event.target.tagName === 'INPUT' && event.target.type === 'text') {
                        return;
                      }

                      // Disparar eventos sintéticos
                      event.target.dispatchEvent(new TouchEvent('touchend', {
                        target: event.target,
                        bubbles: true
                      }));

                      event.target.dispatchEvent(new MouseEvent('mouseover', {
                        target: event.target,
                        bubbles: true
                      }));

                      event.target.dispatchEvent(new PointerEvent('click', {
                        target: event.target,
                        bubbles: true,
                        cancelable: true,
                        detail: 1,
                        clientX: event.changedTouches[0].clientX,
                        clientY: event.changedTouches[0].clientY
                      }));

                      event.preventDefault();
                    }
                  }, {
                    isGTM: true
                  });
                }

                // Manejar eventos del usuario
                handleUserEvent(event) {
                  // Marcar que el usuario ha interactuado
                  if (!this.userActionTriggered) {
                    if (event.type === 'mousemove' && !this.firstMousemoveIgnored) {
                      // Ignorar el primer mousemove (puede ser automático)
                      this.firstMousemoveIgnored = true;
                      return;
                    }

                    // Ignorar eventos pasivos que no indican interacción real
                    if (event.type === 'keyup' || event.type === 'mouseover' || event.type === 'mouseout') {
                      return;
                    }

                    this.userActionTriggered = true;
                    this.triggerGTMScript();
                  }
                }

                // Capturar todos los eventos del usuario
                captureUserEvents() {
                  this.triggerEvents.forEach(eventType => {
                    window.addEventListener(eventType, this.userEventHandler, {
                      passive: true,
                      isGTM: true
                    });
                  });

                  document.addEventListener('visibilitychange', this.userEventHandler, {
                    isGTM: true
                  });

                  // Si la página está oculta, activar inmediatamente
                  if (document.hidden) {
                    this.triggerGTMScript();
                  }
                }

                // Remover listeners de interacción del usuario
                removeUserInteractionListener() {
                  this.triggerEvents.forEach(eventType => {
                    window.removeEventListener(eventType, this.userEventHandler, {
                      passive: true
                    });
                  });
                  document.removeEventListener('visibilitychange', this.userEventHandler);
                }

                // Activar el script de GTM
                async triggerGTMScript() {
                  if (this.loaded) return;
                  this.loaded = true;

                  // Cancelar el fallback si la carga ya se disparó (por interacción o por el propio timer)
                  if (this.fallbackTimer) { clearTimeout(this.fallbackTimer); this.fallbackTimer = null; }

                  this.removeUserInteractionListener();

                  const gtmScript = document.querySelector('script[type="lumayolazyloadscript"]');
                  if (gtmScript) {
                    await this.yieldToMain();

                    try {
                      // Cambiar el tipo para que sea ejecutable
                      gtmScript.type = 'text/javascript';
                      const scriptContent = gtmScript.textContent || gtmScript.innerHTML;

                      const src = gtmScript.getAttribute('data-gtm-src');
                      if (src) {
                        gtmScript.removeAttribute('data-gtm-src');
                        gtmScript.src = src;
                      } else {
                        eval(scriptContent);
                      }

                      gtmScript.setAttribute('data-gtm-status', 'executed');
                    } catch (error) {
                      console.error('[GTM] Error:', error);
                    }
                  }
                }

                // Ceder control al navegador (yield to main thread)
                async yieldToMain() {
                  if (document.hidden) {
                    // Si la página está oculta, usar setTimeout
                    return new Promise(resolve => setTimeout(resolve));
                  } else {
                    // Si está visible, usar requestAnimationFrame para mejor rendimiento
                    return new Promise(resolve => requestAnimationFrame(resolve));
                  }
                }
              }

              new GTMLoader();
            })();
          `;

/** Scripts de GTM con carga diferida. Van en <head>, igual que en _document.tsx de Aviva. No renderiza nada si NEXT_PUBLIC_GTM_ID no está definido. */
export function GoogleTagManagerScripts() {
  if (!GTM_ID) return null;

  return (
    <>
      <script type="lumayolazyloadscript" dangerouslySetInnerHTML={{ __html: gtmSnippet }} />
      <script dangerouslySetInnerHTML={{ __html: gtmLoader }} />
    </>
  );
}

/** Iframe <noscript> de GTM. Va al inicio de <body>. */
export function GoogleTagManagerNoscript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        title="Google Tag Manager"
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(GTM_ID)}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
