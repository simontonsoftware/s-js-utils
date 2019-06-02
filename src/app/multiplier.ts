import { CallableObject } from "s-js-utils";

export class Multiplier extends CallableObject<(value: number) => number> {
  constructor(public factor: number) {
    super((value: number) => value * this.factor);
  }
}
