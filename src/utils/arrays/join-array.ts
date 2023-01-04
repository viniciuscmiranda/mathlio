export function joinArray<T>(array: T[][], element: any): T[] {
  return array.reduce((response: T[], item, index) => {
    response.push(...item);

    const isLast = index === array.length - 1;
    if (!isLast) response.push(element);

    return response;
  }, []);
}
