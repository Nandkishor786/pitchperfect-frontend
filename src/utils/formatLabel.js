export const formatLabel = (value = "") => {
  if (!value) return "";

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
