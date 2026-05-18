import { FlowerSpriteByKey } from "./flower-sprite";

/** Contact tile — yellow petals, orange center, deep blue background */
export function PinkFlowerCard() {
  return (
    <div className="pink-flower-card" aria-hidden>
      <div className="pink-flower-card__spin">
        <FlowerSpriteByKey
          name="contactFlower"
          className="pink-flower-card__graphic"
        />
      </div>
    </div>
  );
}
