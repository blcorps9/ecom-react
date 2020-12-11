import { formatPrice } from "./index";

const locales = [
  ["en-IN", 12, "₹12.00"],
  ["en-US", 12, "$12.00"],
  ["en-GB", 12, "€12.00"],
  ["en-JP", 12, "¥12"],
];

describe("Utils", () => {
  describe("#formatPrice", () => {
    test.each(locales)("when lang is %s", (lang, price, expected) => {
      expect(formatPrice(price, lang)).toBe(expected);
    });
  });
});
