import { wrapMethod } from "../public-api";

class O {}

// $ExpectType () => void
wrapMethod({ method() {} }, "method", {});
// $ExpectError
wrapMethod({ method() {} }, "notTheMethod", {});
// $ExpectType () => void
wrapMethod({ method(arg: string) {} }, "method", { before(arg: string) {} });
// $ExpectError
wrapMethod({ method(arg: string) {} }, "method", { before(arg: number) {} });
