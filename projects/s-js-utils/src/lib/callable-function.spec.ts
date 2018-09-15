import { CallableObject } from "./callable-object";

interface Multiplier {
  // tslint:disable:callable-types
  (value: number): number;
}

class Multiplier extends CallableObject {
  constructor(public factor: number) {
    super((value: number) => value * this.factor);
  }
}

describe("CallableFunction", () => {
  it("is callable", () => {
    const multiplier = new Multiplier(2);
    expect(multiplier(2)).toBe(4);
    expect(multiplier(3)).toBe(6);
  });

  it("still has remaining typings", () => {
    const multiplier = new Multiplier(2);
    expect(multiplier(2)).toBe(4);

    multiplier.factor = 3;
    expect(multiplier(2)).toBe(6);
  });
});
