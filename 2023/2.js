const fs = require("node:fs");

const numberWords = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

// Needed to check against reversed line to find the last occurrence of a number word.
const numberWordsReversed = numberWords.map((el) =>
  el.split("").reverse().join("")
);

const numberWordsRegex = new RegExp(numberWords.join("|"));
const numberWordsReversedRegex = new RegExp(numberWordsReversed.join("|"));

function fileReader(path, encoding) {
  let fileData;

  try {
    fileData = fs.readFileSync(path, encoding);
  } catch (err) {
    console.error(err);
    throw err;
  }

  return fileData;
}

function lineReader(fileData) {
  let lineIdx = 0;
  const lines = fileData.split("\r\n");

  return function () {
    const line = lines[lineIdx];
    lineIdx++;

    return line;
  };
}

function extractCalibrationValueFromLine(line) {
  let first;
  let last;
  let firstStrAcc = "";
  let lastStrAcc = "";

  if (!line) {
    return;
  }

  for (const ch of line) {
    if (/\d/.test(ch)) {
      first = ch;
      break;
    }

    firstStrAcc += ch;
    const found = firstStrAcc.match(numberWordsRegex);
    if (found) {
      first = numberWords.indexOf(found[0]);
      break;
    }
  }

  for (const ch of line.split("").reverse()) {
    if (/\d/.test(ch)) {
      last = ch;
      break;
    }

    lastStrAcc += ch;
    const found = lastStrAcc.match(numberWordsReversedRegex);
    if (found) {
      word = found[0].split("").reverse().join("");
      last = numberWords.indexOf(word);
      break;
    }
  }

  return parseInt(first + last);
}

function sumCalibrationValues() {
  const data = fileReader("input.txt", "utf-8");
  const readLine = lineReader(data);
  let sum = 0;

  let line;
  while ((line = readLine()) !== undefined) {
    const value = extractCalibrationValueFromLine(line);
    if (typeof value === "number") {
      sum += value;
    }
  }

  return sum;
}

const result = sumCalibrationValues();
console.log(result);
