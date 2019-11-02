import { noop } from "micro-dash";
import { forEachWithObject } from "../public-api";

interface O {
  a: number;
  b: string;
}
const o = {} as O;

// $ExpectType O
forEachWithObject([1, 2], noop, o);
// $ExpectType O
forEachWithObject({ a: 1, b: 2 }, noop, o);
