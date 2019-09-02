import { noop } from "micro-dash";
import { wrapFunction } from "../public-api";

class O {}

// $ExpectType (this: {}) => void
wrapFunction(noop, {});
// $ExpectType (this: {}, a1: string, a2: Date) => number
wrapFunction((a1: string, a2: Date) => 1, {});
// $ExpectType (this: O) => void
wrapFunction(function(this: O) {}, {});
