export function replaceArrayElement<T>(
  array: T[],
  element: T,
  index: number
): T[] {
  const arrayCopy = [...array];
  arrayCopy.splice(index, 1, element);
  return arrayCopy;
}
