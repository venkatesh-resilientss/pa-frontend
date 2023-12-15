export const getLabel = (label = "") => {
  return label
    .split(" ")
    .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
    .join(" ");
};

export const dateFormat = (inputDate) => {
  if (!inputDate) return "";

  const dt = new Date(inputDate).toLocaleDateString();
  const [month, day, year] = dt.split("/");
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");
  return `${year}-${formattedMonth}-${formattedDay}`;
};

export const exclude = (data, keys) =>
  Object.fromEntries(
    Object.entries(data).filter(([key]) => !keys.includes(key))
  );
