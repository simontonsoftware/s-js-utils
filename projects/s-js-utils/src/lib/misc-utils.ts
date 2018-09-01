import { isUndefined } from "micro-dash";

/**
 * Checks if `value` is anything other than `undefined`.
 *
 * ```ts
 * isDefined({ a: 1 }); // true
 * isDefined(false); // true
 * isDefined(null); // true
 * isDefined(undefined); // false
 * ```
 */
export function isDefined(value: any) {
  return !isUndefined(value);
}

/**
 * Rounds `value` to the nearest multiple of `multiple`.
 *
 * ```ts
 * roundToMultiple(13, 5); // 15
 * roundToMultiple(2, 4.8); // 4
 * roundToMultiple(3, -4); // -3
 * roundToMultiple(0.5, 1.6); // 1.5
 * ```
 */
export function roundToMultipleOf(multiple: number, value: number) {
  return Math.round(value / multiple) * multiple;
}
