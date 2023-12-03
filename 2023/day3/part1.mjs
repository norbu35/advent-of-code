import { fileReader, lineReader } from "../utils/inputReader.mjs";

function createMatrix() {
  const fileData = fileReader("input.txt", "utf-8");
  const readLine = lineReader(fileData, "\n");
  const matrix = [];

  let line;
  while ((line = readLine()) !== undefined) {
    const row = [];
    for (const c of line) {
      row.push(c);
    }
    matrix.push(row);
  }

  return matrix;
}

function checkAdjacent(start, end, y) {
  const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  if (y === 0) {
  } else if (end === 139) { // right edge
  } else if (y === 139) { // bottom edge
  } else if (start === 0) { //left edge
  } else {
    for (let i = start - 1; i <= end; i++) {
      for (let j = y - 1; j <= y; j += 2) {
        if (symbolRegex.test(matrix[j][i])) {
          return true;
        }
      }
    }

    if (
      symbolRegex.test(matrix[y][start - 1]) ||
      symbolRegex.test(matrix[y][start + 1])
    ) {
      return true;
    }
  }

  return false;
}

const matrix = createMatrix();
let sum = 0;

for (const [y, row] of matrix.entries()) {
  let number = "";
  let consecutive = false;
  let start;
  let end;

  for (const [x, char] of row.entries()) {
    if (/\d/.test(char) && !consecutive) {
      start = x;
      number += char;
      consecutive = true;
    } else if (/\d/.test(char)) {
      number += char;
    } else {
      end = x - 1;
      if (consecutive && checkAdjacent(start, end, y)) {
        sum += parseInt(number);
        consecutive = false;
      }
      number = "";
    }
  }
}

console.log(sum);
