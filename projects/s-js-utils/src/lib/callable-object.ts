/**
 * Extend this for classes whose objects are directly callable. Sadly, you'll need to define an extra interface and repeat the typing information, for now. (Maybe fixable with TypeScript 3 tuples?)
 *
 * ```ts
 * interface Multiplier {
 *   (value: number): number;
 * }
 *
 * class Multiplier extends CallableObject {
 *   constructor(public factor: number) {
 *     super((value: number) => value * this.factor);
 *   }
 * }
 *
 * const doubler = new Multiplier(2);
 * doubler(2); // 4
 * doubler.factor = 3;
 * doubler(2); // 6
 * ```
 */
export abstract class CallableObject {
  constructor(f: Function) {
    return Object.setPrototypeOf(f, new.target.prototype);
  }
}
