let nextSeq = 0;

/**
 * A superclass to follow a standard pattern for creating objects to use in your tests. The general outline should look something like:
 *
 * ```ts
 * class Message {
 *   constructor(public id: number, public text: string) {}
 * }
 *
 * interface Options {
 *   applyCypher?: boolean;
 * }
 *
 * class TestMessage extends TestFactorySuperclass<Message, Options>
 *   implements Message {
 *   id!: number;
 *   text!: string;
 *
 *   protected build(attributes: Partial<Message>, options: Options, seq: number) {
 *     // 1) assign defaults for all required attributes
 *     this.id = seq;
 *     this.text = `message ${seq}`;
 *
 *     // 2) call `super.build()`. This will assign all user-provided
 *     // attributes, overwriting defaults assigned above.
 *     super.build(attributes);
 *
 *     // 3) any extra modifications that should apply even to user-provided
 *     // attributes
 *     if (options.applyCypher) {
 *       this.text = shiftCharacters(this.text);
 *     }
 *   }
 * }
 * ```
 */
export abstract class TestFactorySuperclass<Type, OptionsType = {}> {
  constructor(attributes = {} as Partial<Type>, options = {} as OptionsType) {
    this.build(attributes, options, ++nextSeq);
  }

  protected build(
    attributes: Partial<Type>,
    _options?: OptionsType,
    _seq?: number,
  ) {
    Object.assign(this, attributes);
  }
}
