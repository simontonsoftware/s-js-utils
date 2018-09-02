import { toString } from "micro-dash";

/**
 * Converts a 2D array to a csv string. Values are converted using micro-dash's toString().
 *
 * ```ts
 * toCsv([["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]]); // "a,b,c\nd,e,f\ng,h,i"
 * toCsv([
 *   ["a", "", "string"]
 *   [undefined, null],
 *   [true, false],
 *   [1, 2, 3],
     [{}, { hi: "there" }]
 * ]) // "a,,string\n,\ntrue,false\n1,2,3\n[object Object],[object Object]"
 * ```
 */
export function toCsv(content: any[][]) {
  return content
    .map((row) => row.map((cell) => toCellString(cell)).join(","))
    .join("\n");
}

const specialCsvCharactersRegexp = /["|,|\n|\r]/;
const allDoubleQuotes = /"/g;

function toCellString(value: any) {
  const string = toString(value);

  if (specialCsvCharactersRegexp.test(string)) {
    return `"${string.replace(allDoubleQuotes, `""`)}"`;
  } else {
    return string;
  }
}
