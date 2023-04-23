export const wait: (n: number) => Promise<void> = (n) =>
  new Promise((r) => setTimeout(r, n));

export function splitByLine(s: string) {
  return s.split(/\n/);
}

export const escape = (str: string = "") => {
  return str.replace(/[.*+?^${}()/|[\]\\]/g, "\\$&");
};

export const pickOne = <T>(items: T[]) =>
  items[Math.floor(Math.random() * items.length)];

export const randomCompliment = () => pickOne(compliments);

export const compliments = [
  "Nice!",
  "You got this!",
  "Amazing!",
  "Great job!",
  "You're a smart cookie!",
  "You have the best ideas!",
  "You look great today :)",
];
