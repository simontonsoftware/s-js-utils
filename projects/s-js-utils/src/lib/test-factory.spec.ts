import { TestFactorySuperclass } from "./test-factory";

describe("TestFactorySuperclass", () => {
  it("assigns the given attributes", () => {
    expect(new TestMyType({ id: "my id" }).id).toBe("my id");
  });

  it("allows the use of options", () => {
    expect(
      new TestMyTypeWithOptions({}, { idPrefix: "obj-" }).id.startsWith("obj-"),
    ).toBe(true);
  });

  it("provides a unique sequence number", () => {
    const obj1 = new TestMyType();
    const obj2 = new TestMyType();
    expect(obj2.id).toEqual((Number(obj1.id) + 1).toString());
  });
});

class MyType {
  constructor(public id: string) {}
}

class TestMyType extends TestFactorySuperclass<MyType> implements MyType {
  id!: string;

  protected build(attributes: Partial<MyType>, _options: {}, seq: number) {
    this.id = seq.toString();
    super.build(attributes);
  }
}

interface Options {
  idPrefix?: string;
}

class TestMyTypeWithOptions extends TestFactorySuperclass<MyType, Options>
  implements MyType {
  id!: string;

  protected build(attributes: Partial<MyType>, options: Options, seq: number) {
    this.id = (options.idPrefix || "") + seq;
    super.build(attributes);
  }
}
