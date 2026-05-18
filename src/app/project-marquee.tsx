import { ProjectCard } from "./project-card";
import { projects } from "./projects-data";

export function ProjectMarquee() {
  const doubled = [...projects, ...projects];

  return (
    <div className="marquee-mask relative overflow-hidden">
      <div className="flex w-max animate-marquee gap-4">
        {doubled.map((project, index) => (
          <ProjectCard
            key={`${project.name}-${index}`}
            project={project}
            variant="marquee"
            href={project.link2}
          />
        ))}
      </div>
    </div>
  );
}
