import { isUndefined } from 'micro-dash';

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
