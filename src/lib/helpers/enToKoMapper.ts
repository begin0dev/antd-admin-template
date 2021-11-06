export const genderMapper = (str: string) =>
  ({
    men: "남성",
    women: "여성",
    both: "중성",
  }[str] || str);
