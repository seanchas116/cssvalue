export class Variable {
  constructor(public name: string) {}

  toString(): string {
    return `var(${this.name})`;
  }
}
