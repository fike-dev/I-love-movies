export default function setTimer(sec) {
  return new Promise(
    (_, reject) =>
      setTimeout(() => reject(new Error("It took too long to respond!"))),
    sec * 1000
  );
}

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
