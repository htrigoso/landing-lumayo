import type {} from "@mui/x-date-pickers/themeAugmentation";
import { createTheme } from "@mui/material/styles";

// MUI derives color variants (alpha, contrast text) from palette values and rejects `var()`.
// The palette therefore keeps one literal, azul-700 (= --color-primary). Every visible style
// below reads the CSS tokens through `var()`, so the palette literal never reaches the UI directly.
const PALETTE_PRIMARY = "#2364c2";

const FONT_FAMILY = "var(--font-montserrat), system-ui, sans-serif";

export const brandTheme = createTheme({
  palette: {
    primary: { main: PALETTE_PRIMARY, contrastText: "#ffffff" },
  },
  typography: {
    fontFamily: FONT_FAMILY,
  },
  components: {
    // Field: same geometry and states as .field-input (radius, 44 px height, border-input, focus, error).
    MuiPickersOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: "2.75rem",
          paddingLeft: "0.95rem",
          paddingRight: "0.95rem",
          borderRadius: "0.875rem",
          backgroundColor: "var(--color-bg)",
          color: "var(--color-azul-950)",
          fontFamily: FONT_FAMILY,
          fontSize: "1rem",
          "&:hover .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: "var(--color-azul-200)",
          },
          "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: "var(--color-focus)",
            borderWidth: "1.5px",
            boxShadow: "0 0 0 4px color-mix(in srgb, var(--color-aqua-400) 18%, transparent)",
          },
          "&.Mui-error .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: "var(--color-error)",
          },
        },
        notchedOutline: {
          borderColor: "var(--color-border-input)",
          borderWidth: "1.5px",
          transition: "border-color 160ms ease, box-shadow 160ms ease",
        },
      },
    },
    // Day cells: selected day in primary, today outlined in accent-strong.
    MuiPickerDay: {
      styleOverrides: {
        root: {
          fontFamily: FONT_FAMILY,
          color: "var(--color-azul-950)",
          "&.Mui-selected": {
            backgroundColor: "var(--color-primary)",
            color: "var(--color-text-inverse)",
            "&:hover, &:focus": {
              backgroundColor: "var(--color-primary-hover)",
            },
          },
          "&.MuiPickerDay-today": {
            border: "2px solid var(--color-accent-strong)",
          },
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          color: "var(--color-text)",
          fontFamily: FONT_FAMILY,
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        label: {
          color: "var(--color-heading)",
          fontFamily: FONT_FAMILY,
          fontWeight: 800,
        },
      },
    },
    // Popover: 24 px radius, brand border, shadow tinted with azul-950.
    MuiPickerPopper: {
      styleOverrides: {
        paper: {
          borderRadius: "24px",
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg)",
          boxShadow:
            "0 1px 2px color-mix(in srgb, var(--color-azul-950) 6%, transparent), 0 24px 48px -20px color-mix(in srgb, var(--color-azul-950) 35%, transparent)",
          backgroundImage: "none",
        },
      },
    },
  },
});
