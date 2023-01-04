export function moveArrayIndex<T>(
  array: T[],
  currentIndex: number,
  nextIndex?: number
): T[] {
  const arrayCopy = [...array];

  const isCurrentIndexValid = currentIndex in array;
  const isNextIndexValid = nextIndex == null || nextIndex in array;

  if (isCurrentIndexValid && isNextIndexValid) {
    const element = arrayCopy.splice(currentIndex, 1);

    if (nextIndex != null) arrayCopy.splice(nextIndex, 0, ...element);
    else arrayCopy.push(...element);
  }

  return arrayCopy;
}
