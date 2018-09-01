import { writeCsv } from "./write-csv";

describe("writeCsv()", () => {
  it("works", () => {
    expect(writeCsv([["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]])).toBe(
      "a,b,c\nd,e,f\ng,h,i",
    );
  });

  it("handles empty cells properly", () => {
    expect(
      writeCsv([
        ["middle", "", "empty"],
        ["", "start", "empty"],
        ["end", "empty", ""],
      ]),
    ).toBe("middle,,empty\n,start,empty\nend,empty,");
  });

  it("handles empty rows properly", () => {
    expect(writeCsv([["row"], [], ["another row"], []])).toBe(
      "row\n\nanother row\n",
    );
  });

  it("properly escapes double quotes", () => {
    expect(writeCsv([["escape", "csv", `"quotes"`]])).toBe(
      `escape,csv,"""quotes"""`,
    );
  });

  it("properly escapes commas", () => {
    expect(
      writeCsv([["eats shoots and leaves", "eats, shoots, and leaves"]]),
    ).toBe(`eats shoots and leaves,"eats, shoots, and leaves"`);
  });

  it("properly escapes new lines", () => {
    expect(
      writeCsv([["one", "1"], ["two", "1\n2"], ["three", "1\n2\n3"]]),
    ).toBe(`one,1\ntwo,"1\n2"\nthree,"1\n2\n3"`);
  });

  it("escapes properly if there are multiple special things", () => {
    expect(
      writeCsv([
        ["one", "with, comma"],
        ["another", "with\nnewline"],
        ["last", `with "quotes"`],
      ]),
    ).toBe(
      `one,"with, comma"\nanother,"with\nnewline"\nlast,"with ""quotes"""`,
    );
  });

  it("handles things that aren't strings", () => {
    expect(
      writeCsv([
        // [undefined, null],
        [true, false],
        [1, 2, 3],
        [{}, { hi: "there" }],
      ]),
    ).toBe("true,false\n1,2,3\n[object Object],[object Object]");
  });
});
