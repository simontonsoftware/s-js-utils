import { forEach } from "micro-dash";
import { Nil, StringifiedKey } from "./interfaces";

/**
 * Like `forEach` from `micro-dash`, but additionally passes an accumulator to the iteratee.
 *
 * ```ts
 * forEachWithObject<Record<string, string>>(
 *   ["foo", "bar"],
 *   (accumulator, item) => {
 *     accumulator[item] = item.toUpperCase();
 *   },
 * );
 * // result: { foo: "FOO", bar: "BAR" }
 *
 * forEachWithObject(
 *   [2, 4, 6],
 *   (accumulator, item, index) => {
 *     accumulator.push(item * index);
 *   },
 *   [],
 * );
 * // result: [2, 8, 18]
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
