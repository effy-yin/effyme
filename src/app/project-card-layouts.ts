/** hellodani.co: 222×222 small, 380×223 large + frame padding */
export type ProjectImageLayout = {
  /** Which side the large screenshot sits on */
  largeSide: "left" | "right";
  /** Which image is visually on top (z-index) */
  stackTop: "small" | "large";
};

/** Four combinations cycled across projects (varied but deterministic) */
export const PROJECT_IMAGE_LAYOUTS: ProjectImageLayout[] = [
  { largeSide: "left", stackTop: "small" },
  { largeSide: "right", stackTop: "small" },
  { largeSide: "left", stackTop: "large" },
  { largeSide: "right", stackTop: "large" },
  { largeSide: "right", stackTop: "small" },
];
