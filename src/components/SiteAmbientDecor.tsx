import React, { useMemo } from "react";

export type SiteAmbientDensity = "hero" | "section";

export interface SiteAmbientDecorProps {
  isDark: boolean;
  /** Varia posição de anéis e traços entre seções (0–4). */
  pattern?: number;
  density?: SiteAmbientDensity;
}

type Particle = { left: number; top: number; delay: number; duration: number };

function stableParticles(seed: number, count: number): Particle[] {
  let s = (seed % 2147483646) + 1;
  const out: Particle[] = [];
  for (let i = 0; i < count; i += 1) {
    s = (s * 48271) % 2147483647;
    const a = s / 2147483647;
    s = (s * 16807 + i * 9973) % 2147483647;
    const b = s / 2147483647;
    s = (s * 69621 + i) % 2147483647;
    const c = s / 2147483647;
    out.push({
      left: Math.round(a * 94 + 3),
      top: Math.round(b * 88 + 6),
      delay: Math.round(c * 10 * 10) / 10,
      duration: Math.round(8 + c * 12),
    });
  }
  return out;
}

type RingDef = {
  className: string;
  delayClass: string;
};

const RING_PATTERNS: RingDef[][] = [
  [
    { className: "top-20 left-[8%] w-64 h-64", delayClass: "" },
    { className: "top-36 right-[10%] w-32 h-32", delayClass: "delay-700" },
    { className: "bottom-24 left-[12%] w-48 h-48", delayClass: "delay-1000" },
  ],
  [
    { className: "top-16 right-[18%] w-44 h-44", delayClass: "delay-300" },
    { className: "top-[42%] left-[6%] w-36 h-36", delayClass: "delay-700" },
    { className: "bottom-20 right-[8%] w-52 h-52", delayClass: "" },
  ],
  [
    { className: "top-24 left-1/2 -translate-x-1/2 w-40 h-40", delayClass: "delay-500" },
    { className: "top-[55%] right-[12%] w-28 h-28", delayClass: "" },
    { className: "bottom-28 left-[20%] w-56 h-56", delayClass: "delay-1000" },
  ],
  [
    { className: "top-[18%] left-[22%] w-36 h-36", delayClass: "" },
    { className: "bottom-[30%] right-[14%] w-64 h-64", delayClass: "delay-700" },
    { className: "top-[60%] right-[28%] w-32 h-32", delayClass: "delay-300" },
  ],
  [
    { className: "top-28 right-[22%] w-48 h-48", delayClass: "delay-1000" },
    { className: "bottom-16 left-[10%] w-40 h-40", delayClass: "" },
    { className: "top-[48%] left-[40%] w-28 h-28", delayClass: "delay-700" },
  ],
];

type LineDef = { top: string; anim: "right" | "left"; tone: "purple" | "blue" };

const LINE_PATTERNS: LineDef[][] = [
  [
    { top: "33%", anim: "right", tone: "purple" },
    { top: "67%", anim: "left", tone: "blue" },
  ],
  [
    { top: "22%", anim: "left", tone: "blue" },
    { top: "52%", anim: "right", tone: "purple" },
    { top: "84%", anim: "left", tone: "blue" },
  ],
  [
    { top: "18%", anim: "right", tone: "blue" },
    { top: "45%", anim: "left", tone: "purple" },
    { top: "76%", anim: "right", tone: "blue" },
  ],
  [
    { top: "28%", anim: "left", tone: "purple" },
    { top: "62%", anim: "right", tone: "blue" },
  ],
  [
    { top: "15%", anim: "right", tone: "purple" },
    { top: "40%", anim: "left", tone: "blue" },
    { top: "88%", anim: "right", tone: "purple" },
  ],
];

const SiteAmbientDecor: React.FC<SiteAmbientDecorProps> = ({
  isDark,
  pattern = 0,
  density = "section",
}) => {
  const p = ((pattern % 5) + 5) % 5;
  const rings = RING_PATTERNS[p];
  const lines = LINE_PATTERNS[p % LINE_PATTERNS.length];
  const particleCount = density === "hero" ? 22 : 14;
  const particles = useMemo(
    () => stableParticles(10007 + p * 131071, particleCount),
    [p, particleCount]
  );

  const ringBorder = isDark
    ? "border-purple-500/20"
    : "border-purple-400/25";
  const ringBorderAlt = isDark ? "border-blue-500/20" : "border-blue-400/25";

  const linePurple = isDark
    ? "from-transparent via-purple-500/30 to-transparent"
    : "from-transparent via-purple-400/25 to-transparent";
  const lineBlue = isDark
    ? "from-transparent via-blue-500/30 to-transparent"
    : "from-transparent via-blue-400/25 to-transparent";

  const dotClass = isDark
    ? "bg-gradient-to-r from-purple-400 to-blue-400"
    : "bg-gradient-to-r from-purple-500 to-blue-500 opacity-70";

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <div className="absolute inset-0 opacity-10">
        {rings.map((ring, i) => (
          <div
            key={`ring-${p}-${i}`}
            className={`absolute rounded-full border animate-pulse ${ring.className} ${
              i % 2 === 0 ? ringBorder : ringBorderAlt
            } ${ring.delayClass}`}
          />
        ))}
      </div>

      {particles.map((pt, i) => (
        <div
          key={`pt-${p}-${i}`}
          className={`absolute w-2 h-2 rounded-full animate-particle ${dotClass}`}
          style={{
            left: `${pt.left}%`,
            top: `${pt.top}%`,
            animationDelay: `${pt.delay}s`,
            animationDuration: `${pt.duration}s`,
          }}
        />
      ))}

      <div className="absolute inset-0">
        {lines.map((line, i) => (
          <div
            key={`ln-${p}-${i}`}
            className={`absolute left-0 w-full h-px bg-gradient-to-r ${
              line.tone === "purple" ? linePurple : lineBlue
            } ${line.anim === "right" ? "animate-slide-right" : "animate-slide-left"}`}
            style={{ top: line.top }}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(SiteAmbientDecor);
