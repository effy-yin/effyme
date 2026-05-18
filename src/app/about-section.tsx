import {
  ABOUT_BOTTOM_FRAMES,
  AboutPhotoCollage,
  type AboutPhoto,
} from "./about-photo-collage";

const INTRO_PARAS = [
  "I was born in China, and now I live in Melbourne",
  "I like reading and jogging in my free time",
] as const;

const CLOSING_PARA =
  "Creativity has always been my way to express myself. I love to travel and explore new places. ";

type AboutSectionProps = {
  photos: AboutPhoto[];
};

export function AboutSection({ photos }: AboutSectionProps) {
  return (
    <section
      className="about-section overflow-x-clip border-t border-[var(--border)] px-4 py-14 sm:px-6 sm:py-20 md:px-10 md:py-28"
    >
      <div className="about-section__inner mx-auto flex w-full max-w-[824px] flex-col gap-8 sm:gap-10">
        <header className="about-section__header flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <h2 className="shrink-0 font-serif text-[clamp(1.5rem,6vw,2rem)] leading-tight tracking-tight sm:text-[32px] sm:leading-10">
            Behind the scene
          </h2>
          <h3 className="min-w-0 font-serif text-base leading-snug tracking-tight sm:flex-1 sm:text-xl sm:leading-[30px] md:max-w-[420px]">
            A quick peek into my
            world.
          </h3>
        </header>

        <div className="about-section__content flex flex-col gap-6">
          <div className="about-section__top flex flex-col gap-8 md:flex-row md:items-start md:gap-8">
            <div className="about-section__collage order-1 md:order-none">
              <AboutPhotoCollage photos={photos.slice(0, 3)} />
            </div>
            <div className="about-section__intro order-0 flex flex-col gap-4 text-base leading-[1.4] text-foreground sm:gap-6 sm:text-lg md:order-none">
              {INTRO_PARAS.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>

          <div className="about-section__dash" aria-hidden>
            {Array.from({ length: 28 }).map((_, i) => (
              <span key={i} className="about-section__dash-mark" />
            ))}
          </div>

          <div className="about-section__bottom flex flex-col gap-8 md:flex-row md:items-start">
            <p className="about-section__closing text-base leading-[1.4] text-foreground sm:text-lg">
              {CLOSING_PARA}
            </p>
            <div className="about-section__bottom-grid">
              <AboutPhotoCollage
                photos={photos.slice(3, 6)}
                frames={ABOUT_BOTTOM_FRAMES}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
