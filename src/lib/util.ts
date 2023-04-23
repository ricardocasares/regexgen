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
  "You're strong.",
  "Aside from food, you're my favorite thing!",
  "You bring out the best in other people.",
  "When you say, “I meant to do that,” I totally believe you.",
  "When you're not afraid to be yourself is when you're most incredible.",
  "Your hair looks stunning.",
  "You're really something special.",
  "Jokes are funnier when you tell them.",
  "You always know how to find that silver lining.",
  "You're a candle in the darkness.",
  "You're more fun than bubble wrap.",
  "You're like a breath of fresh air.",
  "You're someone's reason to smile.",
  "How do you keep being so funny and making everyone laugh?",
  "You have impeccable manners.",
  "I like your style.",
  "You're strong.",
  "You are brave.",
  "You are beautiful on the inside and outside.",
  "You have the courage of your convictions.",
  "You're a great listener.",
  "You were cool way before hipsters were cool.",
  "You're inspiring.",
  "You're so thoughtful.",
  "You seem to really know who you are.",
  "Your perspective is refreshing.",
  "When you say, I meant to do that, I totally believe you.",
  "You could survive a zombie apocalypse.",
  "When you make a mistake, you fix it.",
  "You're great at figuring stuff out.",
  "Your creative potential seems limitless.",
  "I bet you do crossword puzzles in ink.",
  "You have a good head on your shoulders.",
  "I am so proud of you, and I hope you are too!",
  "You are making a difference.",
  "You deserve a hug right now.",
  "You're a great example to others.",
  "That color is perfect on you.",
  "Your hair looks stunning.",
  "Your hair looks so great today.",
  "You have such a great sense of style.",
  "You have such a great personality.",
  "Your smile is contagious.",
  "You have the best laugh.",
  "You light up the room.",
  "You have a great sense of humor.",
  "You're like sunshine on a rainy day.",
  "You bring out the best in other people.",
  "Colors seem brighter when you're around.",
];
