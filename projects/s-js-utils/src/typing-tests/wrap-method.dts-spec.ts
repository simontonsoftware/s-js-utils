import { wrapMethod } from '../public-api';

class O {}

// $ExpectType () => void
wrapMethod({ method() {} }, 'method', {});
// $ExpectError
wrapMethod({ method() {} }, 'notTheMethod', {});
// $ExpectType () => void
wrapMethod({ method(arg: string) {} }, 'method', { before(arg: string) {} });
// $ExpectError
wrapMethod({ method(arg: string) {} }, 'method', { before(arg: number) {} });

// Production bug: this was showing an error because the typing thought it was trying to wrap the wrong method
class EventTrackingService {
  sendError(message: string) {}
  track(name: string, category: string) {}
}
// $ExpectType () => void
wrapMethod(new EventTrackingService(), 'track', {
  before(name: string, category: string) {},
});
