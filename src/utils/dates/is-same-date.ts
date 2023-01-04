type DateParsable = string | number | Date;

export function isSameDate(date1: DateParsable, date2: DateParsable): boolean {
  const date1Parsed = new Date(date1);
  const date2Parsed = new Date(date2);

  const isDate1Invalid = Number.isNaN(date1Parsed.getTime());
  const isDate2Invalid = Number.isNaN(date2Parsed.getTime());

  if (isDate1Invalid || isDate2Invalid) return false;

  const isSameYear = date1Parsed.getFullYear() === date2Parsed.getFullYear();
  const isSameMonth = date1Parsed.getMonth() === date2Parsed.getMonth();
  const isSameDay = date1Parsed.getDate() === date2Parsed.getDate();

  return isSameYear && isSameMonth && isSameDay;
}
