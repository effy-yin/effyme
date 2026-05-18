import Image from "next/image";
import { projects } from "./projects-data";

export function ProjectMarquee() {
  const doubled = [...projects, ...projects];

  return (
    <div className="marquee-mask relative overflow-hidden">
      <div className="flex w-max animate-marquee gap-4">
        {doubled.map((project, index) => (
          <a
            key={`${project.name}-${index}`}
            href={project.link2}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name}`}
            className="relative block h-36 w-52 shrink-0 overflow-hidden rounded-xl transition-opacity hover:opacity-90 sm:h-48 sm:w-72 sm:rounded-2xl md:h-56 md:w-80"
          >
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="320px"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
