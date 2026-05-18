import Image from "next/image";
import Link from "next/link";

const leftNav = [
  { label: "About", href: "https://about.effy.me" },
  { label: "Works", href: "#works" },
] as const;

const rightNav = [
  { label: "Github", href: "https://github.com/effy-yin" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/effy-yin-89638168/",
  },
] as const;

function NavLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className = "nav-link min-w-0 text-center sm:min-w-[60px]";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="relative z-50 w-full">
      <nav
        className="mx-auto flex w-full max-w-[1440px] items-center gap-2 px-4 pt-5 pb-3 sm:gap-4 sm:px-6 sm:pt-8 sm:pb-4 md:gap-6 md:px-10"
        aria-label="Main"
      >
        <div className="flex flex-1 items-center justify-end gap-3 sm:gap-6 md:gap-8">
          {leftNav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              external={item.href.startsWith("http")}
            />
          ))}
        </div>

        <Link
          href="/"
          className="relative z-[60] flex shrink-0 items-center justify-center bg-background px-1 sm:px-3"
          aria-label="Effy — Home"
        >
          <Image
            src="/logo.png"
            alt="Effy"
            width={1254}
            height={1254}
            unoptimized
            priority
            className="h-10 w-auto object-contain sm:h-14 md:h-16"
          />
        </Link>

        <div className="flex flex-1 items-center justify-start gap-3 sm:gap-6 md:gap-8">
          {rightNav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} external />
          ))}
        </div>
      </nav>
    </header>
  );
}
