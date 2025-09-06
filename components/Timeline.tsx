import React from "react";
import TimelineItem, { TimelineEntry } from "./TimelineItem";

interface Props {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: Props) {
  return (
    <div className="mt-12 max-w-3xl mx-auto">
      <ul className="space-y-12 relative">
        {entries.map((e, i) => (
          <TimelineItem key={i} entry={e} />
        ))}
      </ul>
    </div>
  );
}

