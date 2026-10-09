/**
 * Formats a Date object to a readable Dutch date string
 * @param date - The date to format
 * @returns Formatted date string (e.g., "20 januari 2024")
 */
export function formatDate(date: Date): string {
  const months = [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
