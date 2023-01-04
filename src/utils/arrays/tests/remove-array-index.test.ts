import { describe, it, expect } from "vitest";
import { removeArrayIndex } from "utils/arrays/remove-array-index";

describe("remove array index", () => {
  const array = [1, 2, 3, 4, 5];

  it("should remove the correct index", () => {
    expect(removeArrayIndex(array, 3)).toEqual([1, 2, 3, 5]);
    expect(removeArrayIndex(array, 1)).toEqual([1, 3, 4, 5]);
    expect(removeArrayIndex(array, -2)).toEqual([1, 2, 3, 5]);
    expect(removeArrayIndex(array, -4)).toEqual([1, 3, 4, 5]);
  });

  it("should remove the last index by default", () => {
    expect(removeArrayIndex(array)).toEqual([1, 2, 3, 4]);
  });

  it("should not remove invalid indexes", () => {
    expect(removeArrayIndex(array, 99)).toEqual(array);
  });

  it("should not modify the original array", () => {
    const arrayCopy = [...array];
    removeArrayIndex(array);

    expect(array).toEqual(arrayCopy);
  });

  it("should create a new array", () => {
    expect(removeArrayIndex(array)).not.toBe(array);
    expect(removeArrayIndex(array, 99)).not.toBe(array);
  });
});
