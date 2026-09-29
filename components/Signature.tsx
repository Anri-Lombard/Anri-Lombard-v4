// Monoline letters on a 60-tall grid, shared with the GitHub profile art: [path, advance width].
const GLYPHS: Record<string, [string, number]> = {
  A: ["M0 60 L20 0 L40 60 M8 38 H32", 40],
  N: ["M0 60 V0 L40 60 V0", 40],
  R: ["M0 60 V0 H24 A15 15 0 0 1 24 30 H0 M20 30 L40 60", 40],
  I: ["M4 0 H28 M16 0 V60 M4 60 H28", 32],
  L: ["M0 0 V60 H36", 36],
  O: ["M20 0 A20 30 0 0 1 20 60 A20 30 0 0 1 20 0", 40],
  M: ["M0 60 V0 L20 36 L40 0 V60", 40],
  B: ["M0 60 V0 H22 A14 14 0 0 1 22 28 H0 M22 28 A16 16 0 0 1 22 60 H0", 40],
  D: ["M0 0 V60 H14 A26 30 0 0 0 14 0 Z", 40],
  " ": ["", 20],
};
const GAP = 16;

export default function Signature({ text = "ANRI LOMBARD" }: { text?: string }) {
  let x = 4;
  let n = 0;
  const paths = text.split("").map((c, i) => {
    const [d, adv] = GLYPHS[c];
    const el = d ? (
      <path key={i} d={d} pathLength={1} transform={`translate(${x} 4)`} style={{ animationDelay: `${n++ * 0.11}s` }} />
    ) : null;
    x += adv + GAP;
    return el;
  });
  return (
    <svg className="signature" viewBox={`0 0 ${x - GAP + 4} 68`} role="img" aria-label={text}>
      {paths}
    </svg>
  );
}
