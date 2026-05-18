/** Notebook grid + decorations from hellodani.co (408×230 SVG) */
export function AboutNotebookGrid({ className = "" }: { className?: string }) {
  const gridStroke = "#e7e7e1";
  const accentStroke = "#bdbdae";

  const verticals = [
    84.5, 60.5, 108.5, 132.5, 156.5, 180.5, 204.5, 228.5, 252.5, 276.5, 300.5,
    324.5, 348.5,
  ];
  const horizontals = [65.5, 89.5, 113.5, 137.5];

  return (
    <svg
      className={className}
      viewBox="0 0 408 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {verticals.map((x) => (
        <path
          key={`v-${x}`}
          d={`M ${x} 42 L ${x} 162`}
          stroke={gridStroke}
          strokeMiterlimit={10}
        />
      ))}
      {horizontals.map((y) => (
        <path
          key={`h-${y}`}
          d={`M 36 ${y} L 372 ${y}`}
          stroke={gridStroke}
          strokeMiterlimit={10}
        />
      ))}
      <path
        d="M 364 42 L 44 42 C 39.582 42 36 45.582 36 50 L 36 154 C 36 158.418 39.582 162 44 162 L 364 162 C 368.418 162 372 158.418 372 154 L 372 50 C 372 45.582 368.418 42 364 42 Z"
        stroke={gridStroke}
        strokeMiterlimit={10}
      />
      <path
        d="M 192 150 C 194.687 163.593 210.448 186.701 252 170.39"
        stroke={accentStroke}
        strokeMiterlimit={10}
      />
      <path
        d="M 0 28.125 C 14.217 -10.008 53.721 0.81 41.026 13.921 C 21.25 34.343 1.102 12.732 46.286 1.13 C 67.25 -4.253 81.361 10.483 88.832 26.589"
        stroke={accentStroke}
        strokeMiterlimit={10}
      />
    </svg>
  );
}
