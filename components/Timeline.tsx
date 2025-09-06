import React from "react";
import TimelineItem, { TimelineEntry } from "./TimelineItem";

interface Props {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: Props) {
  return (
    <div className="mt-12 max-w-3xl mx-auto">
      <div className="relative">
        {/* Center spine visible across the whole timeline */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />
        <ul className="space-y-12">
          {entries.map((e, i) => (
            <TimelineItem key={i} entry={e} />
          ))}
        </ul>
      </div>
    </div>
  );
}
