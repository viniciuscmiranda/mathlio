export function splitArray<T>(array: T[], splitter: T): T[][] {
  return array.reduce((acc: T[][], curr) => {
    if (curr === splitter) {
      acc.push([]);
    } else {
      const lastIndex = (acc.length || 1) - 1;
      const lastElement = acc[lastIndex] || [];

      acc[lastIndex] = [...lastElement, curr];
    }

    return acc;
  }, []);
}
