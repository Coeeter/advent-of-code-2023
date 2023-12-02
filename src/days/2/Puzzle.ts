type Game = {
  id: number;
  sets: { blue?: number; green?: number; red?: number }[];
}[];

const parseInput: (input: string) => Game = (input) => {
  const game: Game = [];
  input.split('\r\n').forEach((line) => {
    const [id, sets] = line.split(': ');
    game.push({
      id: Number(id.replace('Game ', '')),
      sets: sets.split('; ').map((set) => {
        return set.split(', ').reduce(
          (acc, curr) => {
            const [value, color] = curr.split(' ');
            const key = color as keyof typeof acc;
            acc[key] = Number(value);
            return acc;
          },
          {} as Game[number]['sets'][number]
        );
      }),
    });
  });
  return game;
};

const first = (input: string) => {
  const game: Game = parseInput(input);
  let sum = 0;
  const expectedNumber = {
    red: 12,
    green: 13,
    blue: 14,
  };
  game.forEach((game) => {
    const length = game.sets.filter((set) => {
      if (set.blue && set.blue > expectedNumber.blue) {
        return false;
      }
      if (set.green && set.green > expectedNumber.green) {
        return false;
      }
      if (set.red && set.red > expectedNumber.red) {
        return false;
      }
      return true;
    }).length;
    if (length < game.sets.length) {
      return;
    }
    sum += game.id;
  });
  return sum;
};

const expectedFirstSolution = '8';

const second = (input: string) => {
  const game = parseInput(input);
  let sum = 0;
  game.forEach((game) => {
    const max = game.sets.reduce(
      (acc, curr) => {
        if (curr.blue && curr.blue > acc.blue) {
          acc.blue = curr.blue;
        }
        if (curr.green && curr.green > acc.green) {
          acc.green = curr.green;
        }
        if (curr.red && curr.red > acc.red) {
          acc.red = curr.red;
        }
        return acc;
      },
      {
        blue: 0,
        green: 0,
        red: 0,
      }
    );
    sum += max.blue * max.green * max.red;
  });
  return sum;
};

const expectedSecondSolution = '2286';

export { first, expectedFirstSolution, second, expectedSecondSolution };
