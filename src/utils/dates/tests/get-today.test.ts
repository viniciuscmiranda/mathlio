import { describe, it, expect } from "vitest";
import { getToday, isSameDate } from "utils/dates";

describe("get today", () => {
  it("should return the correct date", () => {
    const today = getToday();
    const date = new Date();

    expect(isSameDate(today, date)).toBe(true);
    expect(today.getDate()).toEqual(date.getDate());
    expect(today.getMonth()).toEqual(date.getMonth());
    expect(today.getFullYear()).toEqual(date.getFullYear());
  });
});
