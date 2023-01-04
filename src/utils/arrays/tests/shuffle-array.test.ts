import { describe, it, expect } from "vitest";
import { shuffleArray } from "utils/arrays/shuffle-array";

describe("move array index", () => {
  const array = [1, 2, 3, 4, 5];

  it("should be equal to the original array when sorted in the same way", () => {
    expect(shuffleArray(array).sort()).toEqual(array.sort());
  });

  it("should return a new array", () => {
    expect(shuffleArray(array)).not.toBe(array);
  });

  it("should not modify the original array", () => {
    const arrayCopy = [...array];

    shuffleArray(array);
    expect(array).toEqual(arrayCopy);
  });
});
