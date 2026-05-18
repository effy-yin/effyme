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
  href?: string;
};

export function ProjectCard({
  project,
  size = "featured",
  variant = "default",
  href,
}: ProjectCardProps) {
  const isMarquee = variant === "marquee";
  const { largeSide, stackTop } = project.imageLayout;
  const layoutClasses = isMarquee
    ? ""
    : `project-card--${size} project-card--large-${largeSide} project-card--stack-${stackTop}-top`;

  return (
    <a
      href={href ?? project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.name}`}
      className={`project-card ${layoutClasses} group relative block overflow-hidden bg-accent text-left text-foreground ${
        isMarquee
          ? "project-card--marquee shrink-0 rounded-xl sm:rounded-2xl"
          : "w-full rounded-3xl sm:rounded-[40px]"
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
            ? "min-h-36 sm:min-h-48 md:min-h-56"
            : "min-h-[260px] sm:min-h-[320px] md:min-h-[415px]"
        }`}
      >
        {isMarquee ? (
          <div className="project-card__thumb pointer-events-none absolute inset-0 overflow-hidden">
            <Image
              src={project.image}
              alt=""
              fill
              className="object-cover object-center"
              sizes="320px"
            />
          </div>
        ) : (
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
        )}

        <div
          className={`project-card__footer absolute z-10 flex max-w-[calc(100%-2rem)] flex-col-reverse items-start text-left ${
            isMarquee
              ? "bottom-3 left-3 gap-1.5 sm:bottom-4 sm:left-4 sm:gap-2"
              : "bottom-4 left-4 gap-2 sm:bottom-6 sm:left-6 sm:max-w-md sm:gap-3 md:bottom-8 md:left-8"
          }`}
        >
          <div className="project-card__meta w-full text-left">
            <h3
              className={`font-serif leading-tight ${
                isMarquee
                  ? "text-base sm:text-lg"
                  : "text-xl sm:text-2xl md:text-[28px]"
              }`}
            >
              {project.name}
            </h3>
            <p
              className={`tracking-[-0.02em] text-foreground/50 ${
                isMarquee
                  ? "mt-0.5 line-clamp-1 text-xs"
                  : "mt-1 text-sm"
              }`}
            >
              {project.tags}
            </p>
          </div>
          <p
            className={`project-card__description leading-relaxed text-foreground/90 ${
              isMarquee
                ? "line-clamp-4 text-xs sm:line-clamp-5 sm:text-sm"
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
