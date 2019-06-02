import { wrapFunction } from "./wrap-function";
import { assert, SinonStub, stub } from "sinon";

describe("wrapFunction()", () => {
  const context = Symbol("context");
  const arg1 = Symbol("arg1");
  const arg2 = Symbol("arg2");
  const toReturn = Symbol("toReturn");
  const transformed = Symbol("transformed");
  const aroundContext = Symbol("aroundContext");
  const aroundArg = Symbol("aroundArg");
  const aroundReturn = Symbol("aroundReturn");

  let original: SinonStub;
  let around: SinonStub;
  let before: SinonStub;
  let transform: SinonStub;
  let after: SinonStub;

  beforeEach(() => {
    original = stub().returns(toReturn);
    before = stub();
    around = stub().callsFake(function(
      this: any,
      orig: Function,
      ...args: any[]
    ) {
      return [orig.call(aroundContext, aroundArg, ...args), aroundReturn];
    });
    transform = stub().returns(transformed);
    after = stub();
  });

  function expectProperCallToOriginal() {
    assert.calledOnce(original);
    assert.calledOn(original, context);
    assert.calledWithExactly(original, arg1, arg2);
  }

  function expectProperCallToBefore() {
    assert.calledOnce(before);
    assert.calledOn(before, context);
    assert.calledWithExactly(before, arg1, arg2);
  }

  function expectProperCallToTransform() {
    assert.calledOnce(transform);
    assert.calledOn(transform, context);
    assert.calledWithExactly(transform, toReturn, arg1, arg2);
  }

  function expectProperCallToAfter(result: symbol) {
    assert.calledOnce(after);
    assert.calledOn(after, context);
    assert.calledWithExactly(after, result, arg1, arg2);
  }

  function expectProperCallToAround() {
    assert.calledOnce(around);
    assert.calledOn(around, context);
    assert.calledWithExactly(around, original, arg1, arg2);
  }

  function expectAroundedCallToOriginal() {
    assert.calledOnce(original);
    assert.calledOn(original, aroundContext);
    assert.calledWithExactly(original, aroundArg, arg1, arg2);
  }

  function expectAroundedCallToTransform() {
    assert.calledOnce(transform);
    assert.calledOn(transform, context);
    assert.calledWithExactly(transform, [toReturn, aroundReturn], arg1, arg2);
  }

  //////////

  it("runs the before hook", () => {
    const wrapped = wrapFunction(original, { before });

    const returned = wrapped.call(context, arg1, arg2);

    expect(returned).toBe(toReturn);
    expectProperCallToOriginal();
    expectProperCallToBefore();
    assert.callOrder(before, original);
  });

  it("runs the around hook", () => {
    const wrapped = wrapFunction(original, { around });

    const returned = wrapped.call(context, arg1, arg2);

    expect(returned).toEqual([toReturn, aroundReturn]);
    expectAroundedCallToOriginal();
    expectProperCallToAround();
  });

  it("runs the transform hook", () => {
    const wrapped = wrapFunction(original, { transform });

    const returned = wrapped.call(context, arg1, arg2);

    expect(returned).toBe(transformed);
    expectProperCallToOriginal();
    expectProperCallToTransform();
    assert.callOrder(original, transform);
  });

  it("runs the after hook", () => {
    const wrapped = wrapFunction(original, { after });

    const returned = wrapped.call(context, arg1, arg2);

    expect(returned).toBe(toReturn);
    expectProperCallToOriginal();
    expectProperCallToAfter(toReturn);
    assert.callOrder(original, after);
  });

  it("does not require hooks", () => {
    const wrapped = wrapFunction(original, {});

    const returned = wrapped.call(context, arg1, arg2);

    expect(returned).toBe(toReturn);
    expectProperCallToOriginal();
  });

  it("can run all the hooks at once", () => {
    const wrapped = wrapFunction(original, {
      before,
      around,
      transform,
      after,
    });

    const returned = wrapped.call(context, arg1, arg2);

    expect(returned).toBe(transformed);
    expectAroundedCallToOriginal();
    expectProperCallToBefore();
    expectProperCallToAround();
    expectAroundedCallToTransform();
    expectProperCallToAfter(transformed);
    assert.callOrder(before, original, transform, after);
  });

  it("preserves arity", () => {
    expect(wrapFunction((a: number, b: number) => a + b, {}).length).toBe(2);
  });
});
