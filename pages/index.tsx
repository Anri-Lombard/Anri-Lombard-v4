import Head from "next/head";
import Image from "next/image";
import React from "react";
import PersonalIMG from "../public/images/personal.png";
import Timeline from "../components/Timeline";
import type { TimelineEntry } from "../components/TimelineItem";

const IndexPage = () => {
  const timeline: TimelineEntry[] = [
    {
      kind: "point",
      side: "left",
      label: "2002",
      title: "Born in Namibia",
      description: "Windhoek, Namibia.",
      color: "amber",
    },
    {
      kind: "point",
      side: "right",
      label: "2020",
      title: "Matric — Windhoek High School",
      description:
        "Graduated and moved to Cape Town to study at the University of Cape Town.",
      color: "sky",
    },
    {
      kind: "point",
      side: "left",
      label: "2023",
      title: "BSc — UCT",
      description:
        "Bachelor's in Computer Science and Mathematical Statistics.",
      color: "indigo",
    },
    {
      kind: "point",
      side: "right",
      label: "2024",
      title: "BSc (Hons) — UCT",
      description: "Honours in Computer Science.",
      color: "violet",
    },
    {
      kind: "range",
      side: "left",
      start: "2025",
      end: "Present",
      title: "MSc (AI) — UCT",
      description:
        "Started a Master's in Artificial Intelligence. Ongoing research and study.",
      color: "emerald",
    },
    {
      kind: "point",
      side: "right",
      label: "2025",
      title: "Applied for SA Citizenship",
      description: "Through descent.",
      color: "rose",
    },
    {
      kind: "point",
      side: "left",
      label: "Jul 2022",
      title: "SDE Intern — SprintHive",
      description: "First internship experience.",
      color: "sky",
    },
    {
      kind: "range",
      side: "right",
      start: "Nov 2023",
      end: "Feb 2024",
      title: "SDE Intern — SprintHive",
      description: "Second internship.",
      color: "sky",
    },
    {
      kind: "range",
      side: "left",
      start: "Aug 2023",
      end: "Jan 2024",
      title: "Coding Mentor — HyperionDev",
      description: "Mentored aspiring developers.",
      color: "indigo",
    },
    {
      kind: "range",
      side: "right",
      start: "Feb 2024",
      end: "Jul 2024",
      title: "Data Science Lecturer — HyperionDev",
      description: "Taught data science modules.",
      color: "violet",
    },
    {
      kind: "range",
      side: "left",
      start: "May 2024",
      end: "Oct 2024",
      title: "Part-time — SprintHive",
      description: "Continued part-time work.",
      color: "emerald",
    },
    {
      kind: "range",
      side: "right",
      start: "Nov 2024",
      end: "Present",
      title: "SDE — SprintHive",
      description: "Full-time software engineer.",
      color: "sky",
    },
    {
      kind: "range",
      side: "left",
      start: "2025",
      end: "End 2026",
      title: "Coming Soon",
      description:
        "South African citizenship by descent and graduating Master's in AI.",
      color: "amber",
    },
  ];

  return (
    <>
      <Head>
        <title>Anri Lombard</title>
        <meta
          name="description"
          content="Software engineer and Master's student in AI at UCT"
        />
      </Head>

      {/* Intro blurb */}
      <section className="px-6 py-16 md:py-24 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Software engineer and Master&apos;s student in AI at UCT
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          I build useful software and study artificial intelligence at the
          University of Cape Town. Scroll to explore my journey.
        </p>
        <div className="mt-10 text-sm text-gray-500">Scroll ↓</div>
      </section>

      {/* Hero / infographic */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-indigo-100" />
        <div className="relative z-10 flex flex-col items-center">
          <Image
            src={PersonalIMG}
            alt="Anri Lombard"
            width={220}
            height={220}
            className="rounded-full shadow-lg ring-4 ring-white"
            priority
          />
          <h2 className="mt-6 text-2xl md:text-3xl font-semibold text-gray-800">
            Hello! I&apos;m Anri.
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl text-center">
            Focused on AI and building well-crafted software.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-20 md:py-28 bg-white">
        <h3 className="text-2xl md:text-3xl font-semibold text-center">Timeline</h3>
        <Timeline entries={timeline} />
      </section>
    </>
  );
};

export default IndexPage;
