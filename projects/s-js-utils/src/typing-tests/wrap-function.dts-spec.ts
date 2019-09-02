import { noop } from "micro-dash";
import { wrapFunction } from "../public-api";

class O {}

// $ExpectType (this: unknown) => void
wrapFunction(noop, {});
// $ExpectType (this: unknown, _a1: string, _a2: Date) => number
wrapFunction((_a1: string, _a2: Date) => 1, {});
// $ExpectType (this: O) => void
wrapFunction(function(this: O) {}, {});
