import { fileReader, lineReader } from "../utils/inputReader.mjs";

const inputData = fileReader("input.txt", "utf-8");
const readLine = lineReader(inputData, "\n");

const constraint = {
  red: 12,
  green: 13,
  blue: 14,
};

function checkGame(gameData) {
  if (!gameData) {
    return 0;
  }

  const gameId = gameData.split(":")[0].split(" ")[1];
  const dataBody = gameData.split(":")[1].trim();
  const sets = dataBody.split(";").map((el) => el.trim());
  let valid = true;

  for (const set of sets) {
    for (const numberOfColor of set.split(",")) {
      const trimmedNumberOfColor = numberOfColor.trim();
      const color = trimmedNumberOfColor.split(" ")[1];
      const number = trimmedNumberOfColor.split(" ")[0];

      if (number > constraint[color]) {
        valid = false;
        break;
      }
    }
  }

  return valid ? parseInt(gameId) : 0;
}

let result = 0;
let line;

while ((line = readLine()) !== undefined) {
  const value = checkGame(line);
  result += value;
}

console.log(result);
