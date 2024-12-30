# `@seanchas116/cssvalue`

A CSS value parser & serializer

TODO: detailed description

## Usage

```ts
import {
  cssParser,
  Background,
  BackgroundLayer,
  URL,
  Position,
  Dimension,
  HexColor,
} from "@seanchas116/cssvalue";

const background = cssParser.background.tryParse(
  'center / contain no-repeat url("foo.svg"), #eee 35% url("bar.png")',
);

const expected = new Background({
  layers: [
    new BackgroundLayer({
      position: new Position("center", "center"),
      size: "contain",
      repeatStyle: ["no-repeat"],
      image: new URL("foo.svg"),
    }),
    new BackgroundLayer({
      position: new Position(
        { from: "left", offset: new Dimension(35, "%") },
        "center",
      ),
      image: new URL("bar.png"),
    }),
  ],
  color: new HexColor("#eee"),
});

expect(background).toEqual(expected);

background.toString(); // => the original string
```
