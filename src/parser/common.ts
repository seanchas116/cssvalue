import * as bnb from "bread-n-butter";
import { escapeRegExp } from "./util";

export const whitespace = bnb.match(/\s+/);
export const maybeWhitespace = whitespace.or(bnb.ok(""));

export const ident = bnb
  // eslint-disable-next-line no-control-regex
  .match(/([a-z-_]|[^\u0000-\u00A0])([a-z0-9-_]|[^\u0000-\u00A0])*/i)
  .trim(maybeWhitespace);

export type ParserValue<C extends bnb.Parser<unknown>> = C extends bnb.Parser<infer T>
  ? T
  : unknown;

export function doubleBar<T extends Record<string, bnb.Parser<unknown>>>(
  parsers: T
): bnb.Parser<{ [K in keyof T]?: ParserValue<T[K]> }> {
  if (Object.keys(parsers).length === 0) {
    return bnb.ok({});
  }

  return bnb
    .choice(
      ...Object.entries(parsers).map(([key, parser]) => {
        return parser.map((value) => ({ value, key }));
      })
    )
    .chain((result) => {
      const subParsers = { ...parsers };
      delete subParsers[result.key];
      return doubleBar(subParsers)
        .or(bnb.ok({}))
        .map((values) => ({
          [result.key]: result.value,
          ...values,
        }));
    }) as never;
}

export function doubleAmpersand<
  T extends Record<string, bnb.Parser<unknown>>,
  U extends Record<string, bnb.Parser<unknown>>
>(
  parsers: T,
  optional: U = {} as U
): bnb.Parser<{ [K in keyof T]: ParserValue<T[K]> } & { [K in keyof U]?: ParserValue<U[K]> }> {
  if (Object.keys(parsers).length + Object.keys(optional).length === 0) {
    return bnb.ok({} as never).trim(maybeWhitespace);
  }

  return bnb
    .choice(
      ...Object.entries(parsers).map(([key, parser]) => {
        return parser.map((value) => ({ value, key, optional: false }));
      }),
      ...Object.entries(optional).map(([key, parser]) => {
        return parser.map((value) => ({ value, key, optional: true }));
      })
    )
    .chain((result) => {
      const nextParsers = { ...parsers };
      const nextOptional = { ...optional };
      if (result.optional) {
        delete nextOptional[result.key];
      } else {
        delete nextParsers[result.key];
      }

      let next = doubleAmpersand(nextParsers, nextOptional);
      if (Object.keys(nextParsers).length === 0) {
        next = next.or(bnb.ok({} as never).trim(maybeWhitespace));
      }
      return next.map((values) => ({
        [result.key]: result.value,
        ...values,
      }));
    });
}

export function texts<T extends readonly string[]>(texts: T): bnb.Parser<T[number]> {
  const sorted = [...texts].sort().reverse().map(escapeRegExp);
  return bnb.match(RegExp(sorted.join("|"), "i")) as bnb.Parser<T[number]>;
}

export function keywords<T extends readonly string[]>(keywords: T): bnb.Parser<T[number]> {
  return texts(keywords).trim(maybeWhitespace);
}

export function keyword<T extends string>(text: T): bnb.Parser<T> {
  return keywords([text]);
}

export function repeatToken<T>(token: bnb.Parser<T>, count: number): bnb.Parser<T[]> {
  if (count === 0) {
    return bnb.ok([]);
  }
  if (count === 1) {
    return token.map((t) => [t]);
  }
  return token.chain((first) => {
    return repeatToken(token, count - 1)
      .map((rest) => [first, ...rest])
      .or(bnb.ok([first]));
  });
}
