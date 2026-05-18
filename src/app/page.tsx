import Link from "next/link";
import { FooterFlowerMosaic } from "./footer-flowers";
import { HeroFlower, HeroFlowerBlue } from "./hero-flower";
import { SiteHeader } from "./site-header";
import { AboutSection } from "./about-section";
import { ProjectMarquee } from "./project-marquee";
import { PinkFlowerCard } from "./pink-flower-card";
import { WorksSection } from "./works-section";

const navLinks = [
  { label: "About", href: "https://about.effy.me" },
  { label: "Works", href: "#works" },
];

const socialLinks = [
  { label: "github", href: "https://github.com/effy-yin" },
  { label: "linkedIn", href: "https://www.linkedin.com/in/effy-yin-89638168/" },
];

const services = [
  "Product Design",
  "Websites / Apps",
  "Dashboard",
  "Data Visulization",

  "Animation",
  "Web3",
  "Fintech",
];

const aboutImages = [
  {
    src: "/1.jpg",
    alt: "Effy",
  },
  {
    src: "/6.jpg",
    alt: "Effy",
  },

  {
    src: "/4.jpeg",
    alt: "Effy",
  },
  {
    src: "/5.jpeg",
    alt: "Effy",
  },
  {
    src: "/2.jpg",
    alt: "Effy",
  },
  {
    src: "/3.jpg",
    alt: "Effy",
  },
];


export default function Home() {
  return (
    <div className="overflow-x-clip bg-background text-foreground">
      <SiteHeader />

      <main className="overflow-x-clip">
        <section className="relative px-4 pb-16 pt-2 sm:px-6 sm:pb-24 sm:pt-4 md:px-10 md:pb-32 md:pt-6">
          <div
            className="pointer-events-none absolute -left-20 top-16 z-0 hidden h-[min(560px,58vw)] w-[min(560px,58vw)] animate-spin-slow-reverse md:block lg:-left-12 lg:top-12"
            aria-hidden
          >
            <HeroFlowerBlue className="h-full w-full" />
          </div>
          <div
            className="pointer-events-none absolute -right-16 top-24 z-0 hidden h-[min(520px,55vw)] w-[min(520px,55vw)] animate-spin-slow opacity-90 md:block lg:-right-8 lg:top-20"
            aria-hidden
          >
            <HeroFlower className="h-full w-full" />
          </div>
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">
            <p className="animate-fade-up font-cute text-[clamp(1.625rem,5vw,2.125rem)] leading-none tracking-wide text-brand">
              Hi, I&apos;m Effy
            </p>
            <h1
              className="animate-fade-up mt-4 max-w-4xl font-serif text-[clamp(2rem,8vw,3.75rem)] font-normal leading-[1.15] tracking-[-0.02em] sm:mt-6 sm:leading-[1.17] md:text-[60px] md:leading-[70px] md:tracking-[-0.8px]"
              style={{ animationDelay: "0.1s" }}
            >
              Frontend Engineer
              <br />
              you can count on
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-xl px-1 text-base leading-[1.4] text-foreground sm:mt-8 sm:px-0 md:text-lg"
              style={{ animationDelay: "0.2s" }}
            >
              I turn complex ideas into modern web applications, dashboards, and
              data visualization platforms using React, TypeScript, and modern
              frontend technologies.
            </p>
            <div
              className="animate-fade-up mt-10 flex justify-center"
              style={{ animationDelay: "0.25s" }}
            >
              <PinkFlowerCard />
            </div>
            <h3
              className="animate-fade-up mt-5 font-serif text-[clamp(1.5rem,5vw,2.25rem)] leading-tight tracking-tight sm:mt-6 md:text-4xl"
              style={{ animationDelay: "0.28s" }}
            >
              Get in touch
            </h3>
            <a
              href="mailto:effy.yin@gmail.com?subject=Hello&body=I'd like to connect!"
              className="animate-fade-up mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium tracking-[-0.03em] text-background transition-transform hover:scale-[1.02] active:scale-[0.98] sm:mt-10 sm:px-8 sm:py-4 sm:text-base"
              style={{ animationDelay: "0.3s" }}
            >
              Chat with me
              <span aria-hidden>→</span>
            </a>
          </div>

        </section>


        <section className="border-t border-[var(--border)] px-4 py-14 sm:px-6 sm:py-20 md:px-10 md:py-28">
          <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
            <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-tight">
              I&apos;ve got your back with…
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-12 sm:gap-3">
              {services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-[var(--border)] bg-card px-4 py-2 text-xs font-medium text-foreground/80 transition-colors hover:border-foreground/20 hover:bg-accent sm:px-5 sm:py-2.5 sm:text-sm"
                >
                  {service}
                </span>
              ))}
            </div>

            <div className="mt-8 w-full overflow-x-hidden sm:mt-12">
              <ProjectMarquee />
            </div>
          </div>
        </section>

        <section id="works" className="border-t border-[var(--border)] px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20 md:px-10 md:pb-32 md:pt-24">
          <div className="mx-auto flex w-full max-w-[824px] flex-col items-center">
            <h2 className="text-center font-serif text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-tight">
              My Projects
            </h2>
            <p className="mt-4 max-w-2xl px-1 text-center text-base leading-relaxed text-muted sm:mt-6 sm:px-0 md:text-lg">
              Teaming with founders to propel their next product breakthrough
            </p>

            <WorksSection />
          </div>
        </section>

        <AboutSection photos={aboutImages} />


      </main>

      <FooterFlowerMosaic />

      <footer className="border-t border-[var(--border)] px-4 py-6 sm:px-6 sm:py-8 md:px-10">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 sm:gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
}
