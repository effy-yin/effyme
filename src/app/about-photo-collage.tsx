import Image from "next/image";
import { AboutNotebookGrid } from "./about-notebook-grid";

export type AboutPhoto = {
  src: string;
  alt: string;
};

export const ABOUT_TOP_FRAMES = [
  "about-photo--15jfy5s",
  "about-photo--x50csy",
  "about-photo--l7jchc",
] as const;

export const ABOUT_BOTTOM_FRAMES = [
  "about-photo--a9h2to",
  "about-photo--amnqbp",
  "about-photo--1ebr8an",
] as const;

type AboutPhotoCollageProps = {
  photos: AboutPhoto[];
  frames?: readonly string[];
};

export function AboutPhotoCollage({
  photos,
  frames = ABOUT_TOP_FRAMES,
}: AboutPhotoCollageProps) {
  return (
    <div className="about-collage">
      <AboutNotebookGrid className="about-collage__grid h-full w-full" />
      {photos.slice(0, frames.length).map((photo, index) => {
        const frameClass = frames[index];
        if (!frameClass) return null;

        return (
          <div key={`${frameClass}-${photo.src}`} className={`about-photo ${frameClass}`}>
            <div className="about-photo__inner">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={88}
                height={108}
                unoptimized
                className="block h-[108px] w-[88px] rounded-lg object-cover object-center"
                sizes="88px"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
