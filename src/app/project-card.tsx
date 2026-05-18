import Image from "next/image";

import type { ProjectImageLayout } from "./project-card-layouts";

export type Project = {
  name: string;
  tags: string;
  description: string;
  image: string;
  link: string;
  link2: string;
  /** Solid color revealed on hover (hellodani-style expand). */
  color: string;
  imageLayout: ProjectImageLayout;
};

type ProjectCardProps = {
  project: Project;
  /** featured = full-width row; compact = half-width grid column */
  size?: "featured" | "compact";
  variant?: "default" | "marquee";
};

export function ProjectCard({
  project,
  size = "featured",
  variant = "default",
}: ProjectCardProps) {
  const isMarquee = variant === "marquee";
  const { largeSide, stackTop } = project.imageLayout;

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.name}`}
      className={`project-card project-card--${size} project-card--large-${largeSide} project-card--stack-${stackTop}-top group relative block w-full overflow-hidden rounded-3xl bg-accent text-left text-foreground sm:rounded-[40px] ${
        isMarquee ? "project-card--marquee" : ""
      }`}
    >
      <div className="project-card__hover-bg" aria-hidden>
        <div
          className="project-card__hover-bg-color"
          style={{ backgroundColor: project.color }}
        />
      </div>

      <div
        className={`project-card__body relative ${
          isMarquee
            ? "min-h-[300px] md:min-h-[320px]"
            : "min-h-[260px] sm:min-h-[320px] md:min-h-[415px]"
        }`}
      >
        <div className="project-card__mockups pointer-events-none absolute inset-0 overflow-hidden">
          <div className="project-card__mockup project-card__mockup--large">
            <div className="project-card__mockup-frame">
              <div className="project-card__mockup-media project-card__mockup-media--large">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="380px"
                />
              </div>
            </div>
          </div>
          <div className="project-card__mockup project-card__mockup--small">
            <div className="project-card__mockup-frame">
              <div className="project-card__mockup-media project-card__mockup-media--small">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="222px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="project-card__footer absolute bottom-4 left-4 z-10 flex max-w-[calc(100%-2rem)] flex-col-reverse items-start gap-2 sm:bottom-6 sm:left-6 sm:max-w-md sm:gap-3 md:bottom-8 md:left-8">
          <div className="project-card__meta w-full text-left">
            <h3
              className={`font-serif leading-tight ${
                isMarquee
                  ? "text-lg sm:text-xl md:text-2xl"
                  : "text-xl sm:text-2xl md:text-[28px]"
              }`}
            >
              {project.name}
            </h3>
            <p className="mt-1 text-sm tracking-[-0.02em] text-foreground/50">
              {project.tags}
            </p>
          </div>
          <p
            className={`project-card__description leading-relaxed text-foreground/90 ${
              isMarquee
                ? "line-clamp-3 text-sm"
                : "text-sm md:text-base"
            }`}
          >
            {project.description}
          </p>
        </div>
      </div>
    </a>
  );
}
