export function getDayLabel(timestamp: number): string {
  const date = new Date(timestamp);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (isSameDay(date, today)) return "Bugun";
  if (isSameDay(date, yesterday)) return "Kecha";

  return date.toLocaleDateString("ru-RU");
}
