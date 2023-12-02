const first = (input: string) => {
  let sum = 0;
  input.split('\r\n').forEach((line) => {
    const numbers = line.split('').filter((char) => !isNaN(Number(char)));
    if (!numbers.length) {
      return;
    }
    sum += Number(numbers.at(0) + numbers.at(-1));
  });
  return sum;
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  let sum = 0;
  const lines = input.split('\r\n');
  const numbersMap = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };
  lines.forEach((line) => {
    const numbers: string[] = [];

    line.split('').forEach((char, i) => {
      if (!isNaN(Number(char))) {
        numbers.push(char);
        return;
      }
      const digits = Object.keys(numbersMap).find((key) =>
        line.slice(i).startsWith(key)
      );
      if (!digits) {
        return;
      }
      numbers.push(numbersMap[digits as keyof typeof numbersMap]);
    });

    sum += Number(numbers.at(0) + numbers.at(-1));
  });
  return sum;
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };
