import { forEach } from "micro-dash";
import { Nil, StringifiedKey } from "./interfaces";

/**
 * Like `forEach` from `micro-dash`, but additionally passes an accumulator to the iteratee.
 *
 * ```ts
 * forEachWithObject({ a: "foo", b: "bar" }, (accumulator, item) => {
 *   accumulator[item] = item.toUpperCase();
 * });
 * // result: { foo: "FOO", bar: "BAR" }
 *
 * forEachWithObject(
 *   [1, 2, 3],
 *   (accumulator, item, index) => {
 *     accumulator.push(item * index);
 *   },
 *   [],
 * );
 * // result: [0, 2, 6]
 * ```
 */
export function forEachWithObject<I, A>(
  array: I[] | Nil,
  iteratee: (accumulator: A, item: I, index: number) => void,
  accumulator?: A,
): A;
export function forEachWithObject<T, A>(
  sourceObject: T | Nil,
  iteratee: (accumulator: A, item: T[keyof T], key: StringifiedKey<T>) => void,
  accumulator?: A,
): A;

export function forEachWithObject(
  collection: any,
  iteratee: any,
  accumulator: any = {},
) {
  forEach(collection, (value, keyOrIndex) => {
    iteratee(accumulator, value, keyOrIndex);
  });
  return accumulator;
}
