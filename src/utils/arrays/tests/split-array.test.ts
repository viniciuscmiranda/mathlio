import { describe, it, expect } from "vitest";
import { splitArray } from "utils/arrays";

describe("split array", () => {
  it("should split on the correct element", () => {
    const array = "abc.def.ghi.".split("");

    expect(splitArray(array, ".")).toEqual([
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"],
      [],
    ]);
  });

  it("should not copy the elements", () => {
    const array = [{}, {}, {}];
    const result = splitArray(array, array[1]);

    expect(result).toEqual([[{}], [{}]]);
    expect(result[0][0]).toBe(array[0]);
    expect(result[1][0]).toBe(array[2]);
  });
});
