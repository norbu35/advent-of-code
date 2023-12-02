import * as fs from "node:fs";

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

function lineReader(fileData, separator) {
  let lineIdx = 0;
  const lines = fileData.split(separator);

  return function () {
    const line = lines[lineIdx];
    lineIdx++;

    return line;
  };
}

export { fileReader, lineReader };
