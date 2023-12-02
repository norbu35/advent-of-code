import { fileReader, lineReader } from "../utils/inputReader.mjs";

const inputData = fileReader("input.txt", "utf-8");
const readLine = lineReader(inputData, "\n");

function getPowerOfGame(gameData) {
  if (!gameData) {
    return 0;
  }

  const dataBody = gameData.split(":")[1].trim();
  const sets = dataBody.split(";").map((el) => el.trim());
  const cubeTable = {};

  for (const set of sets) {
    for (const numberOfColor of set.split(",")) {
      const trimmedNumberOfColor = numberOfColor.trim();
      const color = trimmedNumberOfColor.split(" ")[1];
      const number = trimmedNumberOfColor.split(" ")[0];

      cubeTable[color] = Math.max(cubeTable[color] || 0, number);
    }
  }

  return Object.values(cubeTable).reduce((acc, val) => acc *= val, 1);
}

let line;
let result = 0;

while ((line = readLine()) !== undefined) {
  result += getPowerOfGame(line);
}

console.log(result);
