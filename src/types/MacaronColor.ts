// The color reference function used in CSS expressions in Macaron files
// Example: `macaron-color(name)`
export class MacaronColor {
  constructor(public name: string) {}

  toString(): string {
    return `macaron-color(${JSON.stringify(this.name)})`;
  }
}
