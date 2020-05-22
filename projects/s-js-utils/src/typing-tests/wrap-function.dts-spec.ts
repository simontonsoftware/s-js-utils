import { noop } from 'micro-dash';
import { wrapFunction } from '../public-api';

class O {
  id = 1;
}
function f(this: O, _a1: string, _a2: Date) {
  return 1;
}

// $ExpectType (this: unknown) => void
wrapFunction(noop, {});
// $ExpectType (this: O, _a1: string, _a2: Date) => number
wrapFunction(f, {
  // $ExpectType (this: O, _a1: string, _a2: Date) => void
  before(_a1, _a2) {},
  // $ExpectType (this: O, orig: (_a1: string, _a2: Date) => number, _a1: string, _a2: Date) => number
  around(orig, _a1, _a2) {
    return 1;
  },
  // $ExpectType (this: O, _r: number, _a1: string, _a2: Date) => number
  transform(_r, _a1, _a2) {
    return 1;
  },
  // $ExpectType (this: O, _r: number, _a1: string) => void
  after(_r, _a1) {},
});
wrapFunction(f, {
  // $ExpectError
  before(this: Date, _a1, _a2) {},
});
wrapFunction(f, {
  // $ExpectError
  around(orig: () => void, _a1, _a2) {
    return 1;
  },
});
wrapFunction(f, {
  // $ExpectError
  transform(_r, _a1, _a2) {
    return '1';
  },
});
wrapFunction(f, {
  // $ExpectError
  after(_r, _a1: Date) {},
});
