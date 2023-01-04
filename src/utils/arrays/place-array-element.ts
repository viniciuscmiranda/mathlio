export function placeArrayElement<T>(
  array: T[],
  element: T,
  index?: number
): T[] {
  const arrayCopy = [...array];

  if (index != null) arrayCopy.splice(index, 0, element);
  else arrayCopy.push(element);

  return arrayCopy;
}
