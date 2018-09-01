export function writeCsv(data: any[][]) {
  return data
    .map((row) => row.map((cell) => escape(cell)).join(","))
    .join("\n");
}

function escape(value: any) {
  const string = value.toString();

  if (/["|,|\n]/.test(string)) {
    return wrapWithQuotes(string.replace(/"/g, `""`));
  } else {
    return string;
  }
}

function wrapWithQuotes(string: string) {
  return `"${string}"`;
}
