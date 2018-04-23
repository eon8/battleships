const instances: { [key: string]: Counter } = {};

export class Counter {

  public static getInstance(name: string) {
    if (!name) {
      throw new Error('Counter has to have a name');
    }
    if (!instances[name]) {
      instances[name] = new Counter();
    }
    return instances[name];
  }

  private value: number;

  private constructor() {
    this.value = 0;
  }

  public tick(): number {
    return ++this.value;
  }

}