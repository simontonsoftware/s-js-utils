import { wrapFunction, Hooks } from "./wrap-function";

/**
 * Replaces a method on `object` with a wrapped version that will call the provided hooks in addition to the original method. See `wrapFunction()` for more details on the hooks.
 *
 * @returns a function to reset the method to its previous, unwrapped state
 *
 * ```ts
 * // log all get requests to the console
 * wrapMethod(HttpClient.prototype, "get", {
 *   before(url) {
 *     console.log("Sending GET request to", url);
 *   }
 * });
 *
 * // suppress benign error messages
 * const unwrap = wrapMethod(console, "error", {
 *   around(original, ...args) {
 *     if (args[0].message !== 'something benign') {
 *       original(...args);
 *     }
 *   }
 * });
 *
 * // remove error suppression (from above)
 * unwrap();
 * ```
 */
export function wrapMethod<K extends keyof any, A extends any[], R, T>(
  object: { [k in K]: (this: T, ...args: A) => R },
  key: K,
  hooks: Hooks<A, R, T>,
) {
  const original = object[key];
  object[key] = wrapFunction(original, hooks);
  return () => {
    object[key] = original;
  };
}
