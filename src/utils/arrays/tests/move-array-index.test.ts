import { describe, it, expect } from "vitest";
import { moveArrayIndex } from "utils/arrays/move-array-index";

describe("move array index", () => {
  const array = [1, 2, 3, 4, 5];

  it("should move the item to the correct index", () => {
    expect(moveArrayIndex(array, 0, 2)).toEqual([2, 3, 1, 4, 5]);
    expect(moveArrayIndex(array, 2, 3)).toEqual([1, 2, 4, 3, 5]);
    expect(moveArrayIndex(array, 4, 1)).toEqual([1, 5, 2, 3, 4]);
  });

  it("should not move with invalid indexes", () => {
    expect(moveArrayIndex(array, -1, 10)).toEqual(array);
    expect(moveArrayIndex(array, 2, 99)).toEqual(array);
    expect(moveArrayIndex(array, 99, 1)).toEqual(array);
  });

  it("should return a new array", () => {
    expect(moveArrayIndex(array, 0, 2)).not.toBe(array);
    expect(moveArrayIndex(array, 99, 99)).not.toBe(array);
  });

  it("should not modify the original array", () => {
    const arrayCopy = [...array];

    moveArrayIndex(array, 0, 2);
    expect(array).toEqual(arrayCopy);
  });

  it("should not create copies of the elements", () => {
    const array = [{}, {}];

    const newArray = moveArrayIndex(array, 0, 1);
    expect(newArray[0]).toBe(array[1]);
    expect(newArray[1]).toBe(array[0]);
  });

  it("should move to the last index by default", () => {
    expect(moveArrayIndex(array, 0)).toEqual([2, 3, 4, 5, 1]);
    expect(moveArrayIndex(array, 2)).toEqual([1, 2, 4, 5, 3]);
  });
});
