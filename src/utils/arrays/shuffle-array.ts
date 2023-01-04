export function shuffleArray<T>(array: T[]): T[] {
  const arrayCopy = [...array];
  const response: T[] = [];

  for (let i = 0; i < array.length; i++) {
    const index = Math.floor(Math.random() * arrayCopy.length);
    const element = arrayCopy[index];

    arrayCopy.splice(index, 1);
    response.push(element);
  }

  return response;
}
