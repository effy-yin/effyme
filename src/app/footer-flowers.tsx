import {
  FLOWER_SPRITES,
  type FlowerSpriteKey,
} from "./flower-sprite";
import { FooterFlowerCell } from "./footer-flower-cell";

/** Desktop order from hellodani.co Flowers-Section (24 flowers, 3×8 rows). */
const FOOTER_ROWS: FlowerSpriteKey[][] = [
  [
    "footerYellowRed",
    "footerPinkWhite",
    "footerBlueYellow",
    "footerBlueAqua",
    "footerRedWhite",
    "footerYellowPink",
    "footerAquaRed",
    "footerPinkBlue",
  ],
  [
    "footerRedAqua",
    "footerBlueWhite",
    "footerAquaRed",
    "footerRedAqua",
    "footerPinkBlue",
    "footerYellowPink",
    "footerBlueWhite",
    "footerBlueAqua",
  ],
  [
    "footerRedWhite",
    "footerYellowRed",
    "footerBlueYellow",
    "footerPinkWhite",
    "footerYellowRed",
    "footerBlueWhite",
    "footerRedAqua",
    "footerBlueAqua",
  ],
];

export function FooterFlowerMosaic() {
  return (
    <section className="footer-mosaic border-t border-[var(--border)]">
      <div className="footer-mosaic__inner">
        {FOOTER_ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="footer-mosaic__row"
          >
            {row.map((key, colIndex) => {
              const { id, viewBox } = FLOWER_SPRITES[key];
              return (
                <FooterFlowerCell
                  key={`${rowIndex}-${colIndex}-${key}`}
                  id={id}
                  viewBox={viewBox}
                />
              );
            })}
          </div>
        ))}

        <div className="footer-mosaic__quote">
          <p className="font-serif text-xl leading-snug text-foreground md:text-2xl">
          Build a life centered on health, meaningful connections, continuous learning, and the freedom to create with purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
