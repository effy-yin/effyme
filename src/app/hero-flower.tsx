import { FlowerSpriteByKey } from "./flower-sprite";

export function HeroFlower({ className = "" }: { className?: string }) {
  return <FlowerSpriteByKey name="heroRed" className={className} />;
}

export function HeroFlowerBlue({ className = "" }: { className?: string }) {
  return <FlowerSpriteByKey name="heroBlue" className={className} />;
}
