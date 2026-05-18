import { readFileSync, readdirSync } from "fs";
import { join } from "path";

function readSvg(path: string): string {
  return readFileSync(path, "utf-8");
}

/**
 * Injects all flower SVG definitions once (Framer #svg-templates pattern).
 * Instances reference them with <use href="#svgId" />.
 */
export function SvgSprites() {
  const sprites = [
    readSvg(join(process.cwd(), "public/hero-flower.svg")),
    readSvg(join(process.cwd(), "public/hero-flower-blue.svg")),
    readSvg(join(process.cwd(), "public/contact-flower.svg")),
    ...readdirSync(join(process.cwd(), "public/footer"))
      .filter((name) => name.endsWith(".svg"))
      .map((name) => readSvg(join(process.cwd(), "public/footer", name))),
  ];

  return (
    <div
      id="svg-templates"
      aria-hidden
      style={{
        position: "absolute",
        overflow: "hidden",
        bottom: 0,
        left: 0,
        width: 0,
        height: 0,
        zIndex: 0,
        contain: "strict",
      }}
      dangerouslySetInnerHTML={{ __html: sprites.join("") }}
    />
  );
}
