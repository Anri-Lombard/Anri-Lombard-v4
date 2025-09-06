import React, { useMemo } from "react";

type Side = "left" | "right";

export type ScaledEntry =
  | {
      kind: "point";
      side: Side;
      date: string; // e.g. "2022-07" or "Jul 2022" or "2025"
      title: string;
      description: string;
      color?: string; // tailwind color keyword
    }
  | {
      kind: "range";
      side: Side;
      start: string; // e.g. "Nov 2023"
      end: string; // e.g. "Feb 2024" or "Present" or "Dec 2026"
      title: string;
      description: string;
      color?: string;
    };

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function parseDate(input: string, fallbackMonth = 6): Date {
  const s = input.trim();
  if (/^present$/i.test(s)) return new Date();
  // End YYYY -> Dec of that year
  const endMatch = s.match(/^End\s+(\d{4})$/i);
  if (endMatch) return new Date(Number(endMatch[1]), 11, 1);

  // YYYY-MM
  const iso = s.match(/^(\d{4})-(\d{1,2})$/);
  if (iso) return new Date(Number(iso[1]), Number(iso[2]) - 1, 1);

  // Mon YYYY
  const monYr = s.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})$/i);
  if (monYr) {
    const m = MONTHS.findIndex((m) => m.toLowerCase() === monYr[1].toLowerCase());
    return new Date(Number(monYr[2]), m, 1);
  }

  // YYYY
  const yr = s.match(/^(\d{4})$/);
  if (yr) return new Date(Number(yr[1]), fallbackMonth, 1);

  // Default: now
  return new Date();
}

function monthsBetween(a: Date, b: Date) {
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const colorToBg: Record<string, string> = {
  sky: "bg-sky-500",
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
  amber: "bg-amber-500",
  violet: "bg-violet-500",
};

interface Props {
  entries: ScaledEntry[];
}

export default function TimelineScaled({ entries }: Props) {
  // Normalize dates and compute scale
  const monthHeight = 28; // px per month
  const gutter = 24; // px from spine to first lane connector
  const laneWidth = 220; // px width per lane
  const minSeparation = 20; // px minimum vertical gap per lane

  const normalized = useMemo(() => {
    const normalized = entries.map((e) => {
      if (e.kind === "point") {
        return { ...e, _date: parseDate(e.date) } as const;
      } else {
        return { ...e, _start: parseDate(e.start), _end: parseDate(e.end) } as const;
      }
    });

    // Determine overall bounds
    const allDates: Date[] = [];
    normalized.forEach((e: any) => {
      if (e.kind === "point") allDates.push(e._date);
      else {
        allDates.push(e._start);
        allDates.push(e._end);
      }
    });
    const minD = new Date(Math.min(...allDates.map((d) => d.getTime())));
    const maxD = new Date(Math.max(...allDates.map((d) => d.getTime())));

    // Add a little padding on both ends
    const minDate = new Date(minD.getFullYear(), Math.max(0, minD.getMonth() - 1), 1);
    const maxDate = new Date(maxD.getFullYear(), Math.min(11, maxD.getMonth() + 2), 1);

    // Positions
    const totalMonths = Math.max(1, monthsBetween(minDate, maxDate));

    function yFor(d: Date) {
      const m = clamp(monthsBetween(minDate, d), 0, totalMonths);
      return m * monthHeight;
    }

    type Positioned = (typeof normalized)[number] & {
      top: number;
      bottom?: number; // for range
      lane: number;
    };

    // Lane assignment per side
    const lanesLeft: number[] = []; // last top per lane
    const lanesRight: number[] = [];

    const positioned: Positioned[] = normalized
      .slice()
      .sort((a: any, b: any) => {
        const at = a.kind === "point" ? yFor(a._date) : yFor(a._start);
        const bt = b.kind === "point" ? yFor(b._date) : yFor(b._start);
        return at - bt;
      })
      .map((e: any) => {
        const side: Side = e.side;
        const top = e.kind === "point" ? yFor(e._date) : yFor(e._start);
        const bottom = e.kind === "range" ? yFor(e._end) : undefined;

        const laneArr = side === "left" ? lanesLeft : lanesRight;
        let lane = 0;
        for (; lane < laneArr.length; lane++) {
          if (top - laneArr[lane] >= minSeparation) break;
        }
        if (lane === laneArr.length) laneArr.push(top);
        else laneArr[lane] = top; // update last top

        return { ...e, top, bottom, lane } as Positioned;
      });

    const height = totalMonths * monthHeight + 40; // padding
    return { positioned, minDate, maxDate, height };
  }, [entries]);

  // Render month ticks and yearly labels
  const ticks = useMemo(() => {
    const arr: { top: number; year?: number; month: number }[] = [];
    const { minDate, maxDate } = normalized;
    const totalMonths = monthsBetween(minDate, maxDate);
    for (let i = 0; i <= totalMonths; i++) {
      const d = new Date(minDate.getFullYear(), minDate.getMonth() + i, 1);
      arr.push({ top: i * 28, year: d.getMonth() === 0 ? d.getFullYear() : undefined, month: d.getMonth() });
    }
    return arr;
  }, [normalized]);

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <div className="relative" style={{ height: normalized.height }}>
        {/* Center spine */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />

        {/* Month ticks + Year labels */}
        {ticks.map((t, i) => (
          <div key={i} className="absolute left-1/2 -translate-x-1/2" style={{ top: t.top }}>
            <div className="h-px w-4 bg-gray-300 -translate-x-1/2" />
            {t.year && (
              <div className="absolute -left-24 -translate-y-2 text-gray-500 text-xs md:text-sm select-none">
                {t.year}
              </div>
            )}
          </div>
        ))}

        {/* Items */}
        {normalized.positioned.map((e: any, idx: number) => {
          const side: Side = e.side;
          const color = e.color ?? "sky";
          const bg = colorToBg[color] ?? colorToBg["sky"];
          const connectorBase = 32 + e.lane * 16; // lane-dependent connector length
          const cardOffset = 16 + e.lane * (laneWidth / 4);

          // Positions relative to spine
          const styleWrapper: React.CSSProperties = {
            top: e.top,
            ...(side === "left"
              ? { right: `calc(50% + ${gutter + cardOffset}px)` }
              : { left: `calc(50% + ${gutter + cardOffset}px)` }),
          };

          return (
            <div key={idx}>
              {/* Range bar or point on spine */}
              {e.kind === "range" ? (
                <div
                  className={`absolute left-1/2 -translate-x-1/2 ${bg} rounded`}
                  style={{ top: e.top, height: Math.max(12, (e.bottom ?? e.top) - e.top), width: 3 }}
                />
              ) : (
                <span
                  className={`absolute left-1/2 -translate-x-1/2 -mt-1 w-2.5 h-2.5 ${bg} rounded-full ring-4 ring-white shadow`}
                  style={{ top: e.top }}
                />
              )}

              {/* Connector from spine */}
              <span
                className={`absolute top-0 h-0.5 ${bg}`}
                style={
                  side === "left"
                    ? { top: e.top + 2, right: "50%", width: connectorBase }
                    : { top: e.top + 2, left: "50%", width: connectorBase }
                }
              />

              {/* Card */}
              <div className="absolute" style={styleWrapper}>
                <div className="max-w-xs md:max-w-sm p-4 rounded-lg border border-gray-100 shadow-sm bg-white">
                  <div className="font-medium text-gray-800">{e.title}</div>
                  <div className="mt-1 text-gray-600 text-sm">{e.description}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

