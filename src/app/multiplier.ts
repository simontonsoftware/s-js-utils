import { CallableObject } from "../../projects/s-js-utils/src/lib/callable-object";

export interface Multiplier {
  // tslint:disable:callable-types
  (value: number): number;
}

export class Multiplier extends CallableObject {
  constructor(public factor: number) {
    super((value: number) => value * this.factor);
  }
}
