export const Gender = {
  MEN: "men",
  WOMEN: "women",
  BOTH: "both",
} as const;

export type GenderType = typeof Gender[keyof typeof Gender];
