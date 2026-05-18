import { ProjectCard } from "./project-card";
import { projects } from "./projects-data";

/** Bento grid without side flower tiles (featured + 2-col pairs). */
export function WorksSection() {
  const [featured, ...rest] = projects;
  const pairs: (typeof projects)[] = [];

  for (let i = 0; i < rest.length; i += 2) {
    pairs.push(rest.slice(i, i + 2));
  }

  return (
    <div className="mt-8 flex w-full flex-col gap-3 text-left sm:mt-12 sm:gap-4">
      {featured ? <ProjectCard project={featured} size="featured" /> : null}

      {pairs.map((pair) =>
        pair.length === 2 ? (
          <div
            key={`${pair[0].name}-${pair[1].name}`}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <ProjectCard project={pair[0]} size="compact" />
            <ProjectCard project={pair[1]} size="compact" />
          </div>
        ) : (
          <ProjectCard key={pair[0].name} project={pair[0]} size="compact" />
        ),
      )}
    </div>
  );
}
