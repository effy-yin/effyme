import { ProjectCard, type Project } from "./project-card";
import {
  WorksFlowerTile,
  type WorksFlowerTileConfig,
} from "./works-flower-tile";

export type WorksProjectRowConfig = {
  project: Project;
  flowers: [WorksFlowerTileConfig, WorksFlowerTileConfig];
  flowerSide: "left" | "right";
};

export function WorksProjectRow({
  project,
  flowers,
  flowerSide,
}: WorksProjectRowConfig) {
  const flowerColumn = (
    <div className="flex w-full flex-row gap-4 md:h-full md:w-[192px] md:shrink-0 md:flex-col md:gap-4 md:self-stretch">
      {flowers.map((tile, index) => (
        <WorksFlowerTile key={`${tile.flower}-${index}`} {...tile} />
      ))}
    </div>
  );

  const cardColumn = (
    <div className="min-w-0 flex-1">
      <ProjectCard project={project} />
    </div>
  );

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:items-stretch md:gap-4">
      {flowerSide === "left" ? (
        <>
          {flowerColumn}
          {cardColumn}
        </>
      ) : (
        <>
          {cardColumn}
          {flowerColumn}
        </>
      )}
    </div>
  );
}
