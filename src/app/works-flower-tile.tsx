import {
  FLOWER_SPRITES,
  FlowerSprite,
  type FlowerSpriteKey,
} from "./flower-sprite";

export type WorksFlowerTileConfig = {
  flower: FlowerSpriteKey;
  background: string;
};

type WorksFlowerTileProps = WorksFlowerTileConfig;

export function WorksFlowerTile({ flower, background }: WorksFlowerTileProps) {
  const { id, viewBox } = FLOWER_SPRITES[flower];

  return (
    <div
      className="works-flower-tile flex aspect-square w-full max-w-[150px] cursor-pointer items-center justify-center rounded-[32px] md:aspect-auto md:max-w-none md:min-h-0 md:flex-1 md:rounded-[40px]"
      style={{ backgroundColor: background }}
    >
      <div className="works-flower-tile__spin size-[58%] md:size-[56%]">
        <FlowerSprite id={id} viewBox={viewBox} className="h-full w-full" />
      </div>
    </div>
  );
}
