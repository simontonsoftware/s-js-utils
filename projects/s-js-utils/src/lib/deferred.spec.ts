import { expectSingleCallAndReset } from "s-ng-dev-utils";
import { Deferred } from "./deferred";

describe("Deferred", () => {
  describe(".resolve()", () => {
    it("has good typing", () => {
      new Deferred<void>().resolve();
      new Deferred<string>().resolve("hi");
      new Deferred<object>().reject();
      new Deferred<number>().reject("bye");

      // the test is just that the above compiles w/out errors
      expect().nothing();
    });

    it("uses the provided value", async () => {
      const deferred = new Deferred<number>();
      deferred.resolve(42);
      expect(await deferred.promise).toBe(42);
    });

    it("runs success callback on the micro queue", async () => {
      const deferred = new Deferred<boolean>();
      let resolved = false;
      deferred.promise.then(() => (resolved = true));

      deferred.resolve(true);
      expect(resolved).toBe(false);
      await deferred.promise;
      expect(resolved).toBe(true);
    });
  });

  describe(".reject()", () => {
    it("uses the provided value", async () => {
      const deferred = new Deferred<number>();
      deferred.reject("some error");
      try {
        await deferred.promise;
        fail("should not reach here");
      } catch (ex) {
        expect(ex).toBe("some error");
      }
    });

    it("runs error callback on the micro queue", async () => {
      const deferred = new Deferred<boolean>();
      const spy = jasmine.createSpy();
      deferred.promise.catch(spy);

      deferred.reject();
      expect(spy).not.toHaveBeenCalled();
      try {
        await deferred.promise;
        fail("should not reach here");
      } catch {
        expectSingleCallAndReset(spy, undefined);
      }
    });
  });
});
