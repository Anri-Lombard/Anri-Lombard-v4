import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import PersonalIMG from "../public/images/personal.png";

const IndexPage = () => {
  useEffect(() => {
    // Simple intersection-based reveal for timeline items
    const items = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-x-0");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const timeline = [
    { year: "2002", text: "Born in Namibia." },
    {
      year: "2020",
      text:
        "Graduated from Windhoek High School (Namibia) and moved to Cape Town to study at the University of Cape Town.",
    },
    {
      year: "2023",
      text:
        "Graduated with a Bachelor's in Computer Science and Mathematical Statistics (UCT).",
    },
    { year: "2024", text: "Graduated with Honours in Computer Science (UCT)." },
    {
      year: "2025",
      text:
        "Started a Master's in Artificial Intelligence (UCT) — ongoing. Applied for South African citizenship through descent.",
    },
    {
      year: "Jul 2022",
      text: "First Software Development Engineer Intern at SprintHive.",
    },
    {
      year: "Nov 2023 – Feb 2024",
      text: "Second SDE internship at SprintHive.",
    },
    {
      year: "Aug 2023 – Jan 2024",
      text: "Coding Mentor at HyperionDev.",
    },
    {
      year: "Feb 2024 – Jul 2024",
      text: "Data Science Lecturer at HyperionDev.",
    },
    {
      year: "May 2024 – Oct 2024",
      text: "Part-time software work at SprintHive.",
    },
    {
      year: "Nov 2024 – Present",
      text: "Full-time Software Development Engineer at SprintHive.",
    },
    {
      year: "Coming Soon",
      text:
        "South African citizenship by descent and graduating Master\'s in AI (end of 2026).",
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
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-200" />
            <ul className="space-y-10">
              {timeline.map((item, idx) => (
                <li
                  key={idx}
                  className={`reveal-on-scroll opacity-0 transform transition-all duration-700 ease-out ${
                    idx % 2 === 0
                      ? "md:translate-x-[-24px]"
                      : "md:translate-x-[24px]"
                  }`}
                >
                  <div className="relative pl-12 md:pl-0 md:flex md:items-center md:justify-between">
                    {/* Marker */}
                    <span className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-sky-500 rounded-full ring-4 ring-white shadow" />

                    {/* Content */}
                    <div className="md:w-[45%] p-5 rounded-lg border border-gray-100 shadow-sm bg-white">
                      <div className="text-sm uppercase tracking-wide text-sky-700 font-semibold">
                        {item.year}
                      </div>
                      <div className="mt-1 text-gray-700">{item.text}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default IndexPage;
