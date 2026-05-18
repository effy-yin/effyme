import type { WorksFlowerTileConfig } from "./works-flower-tile";

/** hellodani.co works tile backgrounds */
export const WORKS_TILE = {
  pink: "#ff8fca",
  blue: "#0015d4",
  yellow: "#ffcb41",
} as const;

/**
 * Original hellodani.co pairings: one SVG fill matches the tile so it blends in;
 * the other fill is the visible petal (white, red, aqua, etc.).
 */
export const worksFlowerPresets = {
  pinkTile: {
    flower: "footerPinkWhite",
    background: WORKS_TILE.pink,
  },
  blueTile: {
    flower: "footerBlueWhite",
    background: WORKS_TILE.blue,
  },
  yellowTile: {
    flower: "footerYellowRed",
    background: WORKS_TILE.yellow,
  },
  blueTileAqua: {
    flower: "footerBlueAqua",
    background: WORKS_TILE.blue,
  },
} as const satisfies Record<string, WorksFlowerTileConfig>;
