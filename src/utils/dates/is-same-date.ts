type DateParsable = string | number | Date;

export function isSameDate(a: DateParsable, b: DateParsable): boolean {
  const dateA = new Date(a);
  const dateB = new Date(b);

  const isInvalid =
    Number.isNaN(dateA.getTime()) || Number.isNaN(dateB.getTime());

  if (isInvalid) return false;

  const isSameYear = dateA.getFullYear() === dateB.getFullYear();
  const isSameMonth = dateA.getMonth() === dateB.getMonth();
  const isSameDay = dateA.getDate() === dateB.getDate();

  return isSameYear && isSameMonth && isSameDay;
}
