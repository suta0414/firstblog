export const formattedDate = (date: string) => {
  const dateObj = new Date(date);
  // "yyyy/MM/dd HH:mm" 形式で表示
  const formatForm = dateObj.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24時間表記
  });
  return formatForm;
};
