export class Deferred<T> {
  promise: Promise<T>;
  resolve!: (value?: PromiseLike<T> | T) => void;
  reject!: (reason?: any) => void;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
