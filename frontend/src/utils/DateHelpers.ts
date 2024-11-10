export function formatRelativeDate(date: Date) {
  const today = new Date().getTime();
  const evalDate = new Date(date).getTime();

  return Math.abs((evalDate - today) / 3600000).toFixed(0) + " hours ago";
}
