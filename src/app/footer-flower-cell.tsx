"use client";

import { useCallback, useState } from "react";
import { FlowerSprite } from "./flower-sprite";

type FooterFlowerCellProps = {
  id: string;
  viewBox: string;
};

export function FooterFlowerCell({ id, viewBox }: FooterFlowerCellProps) {
  const [spinning, setSpinning] = useState(false);

  const startSpin = useCallback(() => setSpinning(true), []);
  const stopSpin = useCallback(() => setSpinning(false), []);

  return (
    <div
      className={`footer-flower-cell ${spinning ? "is-spinning" : ""}`}
      onPointerEnter={startSpin}
      onPointerLeave={stopSpin}
    >
      <div className="footer-flower-cell__spin">
        <FlowerSprite id={id} viewBox={viewBox} className="footer-flower-graphic" />
      </div>
    </div>
  );
}
