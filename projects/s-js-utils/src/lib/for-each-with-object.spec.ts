import { noop } from "micro-dash";
import { expectCallsAndReset } from "s-ng-dev-utils";
import { forEachWithObject } from "./for-each-with-object";
import createSpy = jasmine.createSpy;

describe("forEachWithObject()", () => {
  it("works with arrays", () => {
    const result = forEachWithObject<number, Array<number>>(
      [1, 2, 3],
      (accumulator, item, index) => {
        accumulator.push(item * index);
      },
      [],
    );
    expect(result).toEqual([0, 2, 6]);
  });

  it("works with objects", () => {
    const result = forEachWithObject<
      Record<string, string>,
      Record<string, string>
    >({ a: "foo", b: "bar" }, (accumulator, item) => {
      accumulator[item] = item.toUpperCase();
    });
    expect(result).toEqual({ foo: "FOO", bar: "BAR" });
  });

  it("works with empty and null collections", () => {
    expect(forEachWithObject({}, noop)).toEqual({});
    expect(forEachWithObject({}, noop, [])).toEqual([]);
    expect(forEachWithObject([], noop)).toEqual({});
    expect(forEachWithObject([], noop, [])).toEqual([]);
    expect(forEachWithObject(null, noop)).toEqual({});
    expect(forEachWithObject(null, noop, [])).toEqual([]);
    expect(forEachWithObject(undefined, noop)).toEqual({});
    expect(forEachWithObject(undefined, noop, [])).toEqual([]);
  });

  it("returns the passed-in accumulator", () => {
    const accum = [] as const;
    const result = forEachWithObject([], noop, accum);
    expect(result).toBe(accum);
  });

  it("provides the right iteratee arguments", () => {
    const spy = createSpy();
    const accum = {};

    forEachWithObject([1, 2], spy, accum);
    expectCallsAndReset(spy, [accum, 1, 0], [accum, 2, 1]);

    forEachWithObject({ a: 1, b: 2 }, spy, accum);
    expectCallsAndReset(spy, [accum, 1, "a"], [accum, 2, "b"]);
  });
});
