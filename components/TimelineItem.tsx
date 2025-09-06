import React, { useEffect, useRef, useState } from "react";

export type TimelineSide = "left" | "right";

export type TimelineEntry =
  | {
      kind: "point";
      side: TimelineSide;
      label: string; // e.g. 2002
      title: string; // short title
      description: string; // details
      color?: string; // tailwind color, e.g. 'sky'
    }
  | {
      kind: "range";
      side: TimelineSide;
      start: string; // e.g. Nov 2024
      end: string; // e.g. Present / Feb 2024
      title: string;
      description: string;
      color?: string; // tailwind color
    };

interface Props {
  entry: TimelineEntry;
}

const colorToBg: Record<string, string> = {
  sky: "bg-sky-500",
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
  amber: "bg-amber-500",
  violet: "bg-violet-500",
};

const colorToRing: Record<string, string> = {
  sky: "ring-sky-100",
  indigo: "ring-indigo-100",
  emerald: "ring-emerald-100",
  rose: "ring-rose-100",
  amber: "ring-amber-100",
  violet: "ring-violet-100",
};

export default function TimelineItem({ entry }: Props) {
  const ref = useRef<HTMLLIElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || !("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const side = entry.side;
  const isLeft = side === "left";
  const color = entry.color ?? "sky";
  const dotColor = colorToBg[color] ?? colorToBg["sky"];
  const ringColor = colorToRing[color] ?? colorToRing["sky"];

  return (
    <li
      ref={ref}
      className={`relative transition-all duration-700 ease-out opacity-0 translate-y-6 ${
        inView ? "opacity-100 translate-y-0" : ""
      }`}
    >
      {/* Marker (dot or range bar) centered on the spine */}
      {entry.kind === "point" ? (
        <span
          className={`absolute left-1/2 -translate-x-1/2 top-6 w-3 h-3 ${dotColor} rounded-full ring-4 ring-white ${ringColor} shadow`}
        />
      ) : (
        <div
          className={`absolute left-1/2 -translate-x-1/2 top-2 md:top-3 w-1 ${dotColor} rounded`}
          style={{ height: "64px" }}
        />
      )}

      {/* Date label on the spine (not in the card) */}
      <div
        className={`hidden md:block absolute top-0 text-xs uppercase tracking-wide text-gray-500 ${
          isLeft ? "left-1/2 pl-3" : "right-1/2 pr-3 text-right"
        }`}
      >
        {entry.kind === "point" ? entry.label : `${entry.start} — ${entry.end}`}
      </div>

      {/* Connector from spine to card */}
      <span
        className={`hidden md:block absolute top-6 h-0.5 w-8 ${dotColor} ${
          isLeft ? "right-1/2" : "left-1/2"
        }`}
      />

      {/* Content layout: two columns on md, card on alternating side */}
      <div className="md:grid md:grid-cols-2 md:gap-8 items-start">
        <div
          className={`mt-10 md:mt-0 ${
            isLeft ? "md:col-start-1 md:justify-self-end" : "md:col-start-2 md:justify-self-start"
          }`}
        >
          <div className="max-w-xl p-5 rounded-lg border border-gray-100 shadow-sm bg-white">
            <div className="font-medium text-gray-800">{entry.title}</div>
            <div className="mt-1 text-gray-600 text-sm">{entry.description}</div>
          </div>
        </div>
      </div>
    </li>
  );
}
