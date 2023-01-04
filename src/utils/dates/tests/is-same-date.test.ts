import { describe, it, expect } from "vitest";
import { isSameDate } from "../is-same-date";

describe("is same day", () => {
  it("should find equal dates", () => {
    expect(isSameDate(new Date(), new Date())).toBe(true);
    expect(isSameDate(new Date(1900), new Date(1900))).toBe(true);
    expect(isSameDate(new Date(2000, 10), new Date(2000, 10))).toBe(true);
    expect(isSameDate(new Date(2020, 5, 20), new Date(2020, 5, 20))).toBe(true);
  });

  it("should find equal string dates", () => {
    expect(isSameDate("10/02/2022", "10/02/2022")).toBe(true);
    expect(isSameDate("12/05/1999", "12/05/1999")).toBe(true);
    expect(isSameDate("10/01/205", "10/01/205")).toBe(true);
  });

  it("should find equal dates with different types", () => {
    expect(isSameDate("10/02/2022", new Date(2022, 9, 2))).toBe(true);
    expect(isSameDate("05/03/200", new Date(200, 4, 3))).toBe(true);
  });

  it("should not different dates", () => {
    expect(isSameDate("10/03/2022", "10/02/2022")).toBe(false);

    const date = new Date();
    date.setDate(date.getDate() - 1);

    expect(isSameDate(new Date(), date)).toBe(false);
  });

  it("should not find invalid dates", () => {
    expect(isSameDate("", "")).toBe(false);
    expect(isSameDate("++++", "++++")).toBe(false);
    expect(isSameDate("99/99/9999", "99/99/9999")).toBe(false);
  });
});
