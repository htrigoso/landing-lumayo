import { describe, expect, it } from "vitest";
import { discountedAmount, promo, promoStatus, promoWhatsappMessage } from "./promo";

const at = (iso: string) => new Date(iso);

describe("promoStatus", () => {
  it("is upcoming until the first instant of 1 December (Lima time)", () => {
    expect(promoStatus(at("2026-11-30T23:59:59.999-05:00"))).toBe("upcoming");
    expect(promoStatus(at(promo.startsAt))).toBe("active");
  });

  it("is active across December and includes its last second", () => {
    expect(promoStatus(at("2026-12-15T12:00:00-05:00"))).toBe("active");
    expect(promoStatus(at(promo.endsAt))).toBe("active");
  });

  it("is ended from the first millisecond after 31 December", () => {
    expect(promoStatus(at("2027-01-01T00:00:00.000-05:00"))).toBe("ended");
    expect(promoStatus(at("2027-01-01T05:00:00.001Z"))).toBe("ended");
  });

  it("uses the Lima offset, so 1 December 04:59 UTC is still 30 November", () => {
    expect(promoStatus(at("2026-12-01T04:59:59Z"))).toBe("upcoming");
    expect(promoStatus(at("2026-12-01T05:00:00Z"))).toBe("active");
  });
});

describe("promoWhatsappMessage", () => {
  it("names the service when one is given", () => {
    expect(promoWhatsappMessage("Carillas")).toBe(
      "Hola Lumayo, quiero usar la promoción 30% de diciembre para Carillas.",
    );
  });

  it("works without a service", () => {
    expect(promoWhatsappMessage()).toBe("Hola Lumayo, quiero usar la promoción 30% de diciembre.");
  });
});

describe("discountedAmount", () => {
  it("applies the percentage to confirmed prices", () => {
    expect(discountedAmount(350)).toBe(245);
    expect(discountedAmount(8000)).toBe(5600);
    expect(discountedAmount(60)).toBe(42);
  });
});
