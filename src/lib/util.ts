export const wait: (n: number) => Promise<void> = (n) =>
  new Promise((r) => setTimeout(r, n));

export const escape = (str: string) => {
  return str.replace(/[.*+?^${}()/|[\]\\]/g, "\\$&");
};
