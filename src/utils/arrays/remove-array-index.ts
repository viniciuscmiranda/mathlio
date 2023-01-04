export function removeArrayIndex<T>(array: T[], index?: number): T[] {
  const arrayCopy = [...array];

  if (index != null) arrayCopy.splice(index, 1);
  else arrayCopy.pop();

  return arrayCopy;
}
