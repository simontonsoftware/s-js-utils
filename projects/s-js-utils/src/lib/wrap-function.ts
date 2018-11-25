/**
 * Returns a new function to use in place of `func` that will call the provided hooks in addition to `func`. They are called in the following order:
 *
 * 1. `before`
 * 2. `original`
 * 3. `transform`
 * 4. `after`
 *
 * ```ts
 * const sum = (a: number, b: number) => a + b;
 * const sumAndLog = wrapFunction(sum, {
 *   after: (result, a, b) => {
 *     console.log(a, '+', b, '=', result);
 *   },
 * }
 * const sumPlusOne = wrapFunction(sum, {
 *   transform: (result) => result + 1,
 * });
 * ```
 */
export function wrapFunction<A extends any[], R>(
  original: (...args: A) => R,
  {
    before,
    transform,
    after,
  }: {
    before?: (...args: A) => void;
    transform?: (result: R, ...args: A) => R;
    after?: (result: R, ...args: A) => void;
  },
): typeof original {
  const wrapped = function(this: any, ...args: A) {
    if (before) {
      before.apply(this, args);
    }
    let result: R = original.apply(this, args);
    if (transform) {
      result = transform.call(this, result, ...args);
    }
    if (after) {
      after.call(this, result, ...args);
    }
    return result;
  };
  Object.defineProperty(wrapped, "length", { value: original.length });
  return wrapped;
}
