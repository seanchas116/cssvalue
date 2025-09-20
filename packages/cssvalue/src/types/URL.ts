export class URL {
  constructor(public url: string) {}

  toString(): string {
    return `url(${JSON.stringify(this.url)})`;
  }
}
