/**
 * Framer-style flower display: sprite definitions live in #svg-templates (layout),
 * each instance renders via <use href="#id"> — same as hellodani.co.
 */

export const FLOWER_SPRITES = {
  heroRed: { id: "svg9874876105", viewBox: "0 0 500 500" },
  heroBlue: { id: "svg11349182076", viewBox: "0 0 600 600" },
  footerRedAqua: { id: "svg86897711_9201", viewBox: "0 0 240 240" },
  footerBlueAqua: { id: "svg394844495_3213", viewBox: "0 0 240 240" },
  footerBlueYellow: { id: "svg-1061847328_3894", viewBox: "0 0 240 240" },
  footerAquaRed: { id: "svg1506719653_5758", viewBox: "0 0 240 240" },
  footerYellowRed: { id: "svg599653479_4501", viewBox: "0 0 240 240" },
  footerYellowPink: { id: "svg-1535384251_3497", viewBox: "0 0 240 240" },
  footerBlueWhite: { id: "svg1453077111_2572", viewBox: "0 0 240 240" },
  footerPinkWhite: { id: "svg-1854711417_3276", viewBox: "0 0 240 240" },
  footerRedWhite: { id: "svg-1604297782_28884", viewBox: "0 0 240 240" },
  footerPinkBlue: { id: "svg-1624021502_4054", viewBox: "0 0 240 240" },
  footerSmall: { id: "svg858166364_6729", viewBox: "0 0 56 56" },
  contactFlower: { id: "svgContactFlower", viewBox: "0 0 240 240" },
} as const;

export type FlowerSpriteKey = keyof typeof FLOWER_SPRITES;

export const FOOTER_FLOWER_KEYS: FlowerSpriteKey[] = [
  "footerRedAqua",
  "footerBlueAqua",
  "footerBlueYellow",
  "footerAquaRed",
  "footerYellowRed",
  "footerYellowPink",
  "footerBlueWhite",
  "footerPinkWhite",
  "footerRedWhite",
  "footerPinkBlue",
  "footerSmall",
];

type FlowerSpriteProps = {
  /** Sprite id from FLOWER_SPRITES, e.g. "svg9874876105" */
  id: string;
  viewBox: string;
  className?: string;
};

/** Matches hellodani.co: .svgContainer > svg > use */
export function FlowerSprite({ id, viewBox, className = "" }: FlowerSpriteProps) {
  return (
    <div
      className={`svg-container ${className}`}
      aria-hidden
    >
      <svg viewBox={viewBox} style={{ width: "100%", height: "100%" }}>
        <use href={`#${id}`} />
      </svg>
    </div>
  );
}

export function FlowerSpriteByKey({
  name,
  className = "",
}: {
  name: FlowerSpriteKey;
  className?: string;
}) {
  const { id, viewBox } = FLOWER_SPRITES[name];
  return <FlowerSprite id={id} viewBox={viewBox} className={className} />;
}
