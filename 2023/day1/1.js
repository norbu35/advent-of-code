const fs = require("node:fs");

function readFile(path) {
  let fileData;

  try {
    fileData = fs.readFileSync("input.txt", "utf-8");
  } catch (err) {
    console.error(err);
  }

  return fileData;
}

function lineReader(string) {
  let lineIdx = 0;
  const lines = string.split("\r\n");

  return function () {
    const line = lines[lineIdx];
    lineIdx++;

    return line;
  };
}

function extractCalibrationValueFromLine(line) {
  if (!line) {
    return;
  }

  const digits = line.match(/\d/g);
  const first = digits.find((d) => /\d/.test(d));
  const last = digits.reverse().find((d) => /\d/.test(d));
  return parseInt(first + last);
}

function sumCalibrationValues() {
  const data = readFile("input.txt");
  const readLine = lineReader(data);
  let sum = 0;

  while (true) {
    let value;
    value = extractCalibrationValueFromLine(readLine());
    if (typeof value === "number") {
      sum += value;
    } else {
      break;
    }
  }

  return sum;
}

console.log(sumCalibrationValues());
