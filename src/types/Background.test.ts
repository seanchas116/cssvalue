import { Background } from "./Background";
import { HexColor } from "./Color";

describe("Background", () => {
  describe("toString", () => {
    it("stringifies empty Background ", () => {
      const background = new Background();
      expect(background.toString()).toEqual("none");
    });
    it("stringifies Background with color only", () => {
      const background = new Background({
        color: new HexColor("#eee"),
      });
      expect(background.toString()).toEqual("#eee");
    });
    // it("serializes Background to css string", () => {
    //   const background = new Background({
    //     layers: [
    //       new BackgroundLayer({
    //         position: new Position("center", "center"),
    //         size: "contain",
    //         repeatStyle: ["no-repeat"],
    //         image: "foo.svg",
    //       }),
    //       new BackgroundLayer({
    //         position: new Position({ from: "left", offset: new Dimension(35, "%") }, "center"),
    //         image: "bar.png",
    //       }),
    //     ],
    //     color: new HexColor("#eee"),
    //   });
    //   expect(background.toString()).toEqual(
    //     'center / contain no-repeat url("foo.svg"), #eee 35% url("bar.png")'
    //   );
    // });
  });
});
