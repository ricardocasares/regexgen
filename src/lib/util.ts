export const wait: (n: number) => Promise<void> = (n) =>
  new Promise((r) => setTimeout(r, n));

export function splitByLine(s: string) {
  return s.split(/\n/);
}

export const escape = (str: string = "") => {
  return str.replace(/[.*+?^${}()/|[\]\\]/g, "\\$&");
};
