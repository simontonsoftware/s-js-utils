import { toString } from "micro-dash";

export function toCsv(content: any[][]) {
  return content
    .map((row) => row.map((cell) => escape(cell)).join(","))
    .join("\n");
}

const specialCsvCharactersRegexp = /["|,|\n|\r]/;
const allDoubleQuotes = /"/g;

function escape(value: any) {
  const string = toString(value);

  if (specialCsvCharactersRegexp.test(string)) {
    return `"${string.replace(allDoubleQuotes, `""`)}"`;
  } else {
    return string;
  }
}
