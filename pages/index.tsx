import type { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Act, Lately } from "../components/Avatar";
import Signature from "../components/Signature";
import portrait from "../public/images/personal.png";

// three.js only runs in the browser; the stage keeps its size while it loads
const Avatar = dynamic(() => import("../components/Avatar"), { ssr: false, loading: () => <div className="stage" /> });

type Theme = "light" | "dark";

const SITE = "https://anri-lombard.vercel.app";
const DESCRIPTION = "Anri Lombard, engineer and researcher in AI and software development.";
const EMAIL = "anri.m.lombard@gmail.com";
const GITHUB = "https://github.com/Anri-Lombard";
const LINKEDIN = "https://www.linkedin.com/in/anri-lombard-ab37ab201/";

const WORK: { name: string; desc: string; href: string; act: Act }[] = [
  { name: "MzansiLM", desc: "An open corpus and language model for South Africa's eleven official written languages. LREC 2026.", href: `${GITHUB}/sallm`, act: "languages" },
  { name: "Mamba-SAFE", desc: "Generating drug-like molecules with Mamba models. NeurIPS 2024 workshop.", href: `${GITHUB}/Mamba-SAFE`, act: "molecules" },
  { name: "sleeptrain", desc: "A Claude Code plugin that watches training runs overnight and leaves a morning report.", href: `${GITHUB}/sleeptrain`, act: "sleep" },
  { name: "Tokenizer Tax", desc: "How many more tokens the same text costs in your language, across 222 languages.", href: "https://anri-lombard.github.io/tokentax", act: "tokens" },
  { name: "Slow Horizon", desc: "A calm sea for your second screen, in a native macOS app.", href: `${GITHUB}/slow-horizon`, act: "sea" },
];

// The profile and this site's repo get pushed to for housekeeping, so they say nothing about current work.
const NOT_WORK = ["Anri-Lombard/Anri-Lombard", "Anri-Lombard/Anri-Lombard-v4"];

const latestPush = async (): Promise<Lately | null> => {
  const res = await fetch("https://api.github.com/users/Anri-Lombard/events/public?per_page=100", {
    headers: { Accept: "application/vnd.github+json" },
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`GitHub events: ${res.status}`);
  const events: { type: string; created_at: string; repo: { name: string } }[] = await res.json();
  const push = events
    .filter((e) => e.type === "PushEvent" && !NOT_WORK.includes(e.repo.name))
    .sort((a, b) => b.created_at.localeCompare(a.created_at))[0];
  if (!push) return null;
  return {
    repo: push.repo.name.split("/")[1],
    href: `https://github.com/${push.repo.name}`,
    day: new Date(push.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Africa/Johannesburg" }),
  };
};

export const getStaticProps: GetStaticProps<{ lately: Lately | null }> = async () => {
  try {
    return { props: { lately: await latestPush() }, revalidate: 3600 };
  } catch (err) {
    // Throwing during regeneration keeps the last good page, which beats dropping the line when GitHub rate limits us.
    // A build has no last good page, so it renders without the line instead of failing.
    if (process.env.NEXT_PHASE !== "phase-production-build") throw err;
    return { props: { lately: null }, revalidate: 60 };
  }
};

export default function Home({ lately }: { lately: Lately | null }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [copied, setCopied] = useState(false);
  const [act, setAct] = useState<Act | null>(null);
  const workList = useRef<HTMLUListElement>(null);

  useEffect(() => setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light"), []);

  // Touch screens have no hover, so the row just below the pinned avatar takes the stage as the list scrolls past.
  useEffect(() => {
    if (!matchMedia("(hover: none)").matches) return;
    let queued = false;
    const pick = () => {
      queued = false;
      const stage = document.querySelector(".stage");
      if (!stage || !workList.current) return;
      const line = stage.getBoundingClientRect().bottom + 48;
      const rows = Array.from(workList.current.children);
      const row = rows.find((r) => {
        const { top, bottom } = r.getBoundingClientRect();
        return top <= line && line < bottom;
      });
      setAct(row ? WORK[rows.indexOf(row)].act : null);
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(pick);
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    setTheme(next);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <>
      <Head>
        <title>Anri Lombard</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Anri Lombard" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={SITE} />
        <meta property="og:image" content={`${SITE}/og.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="topbar">
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="mode" onClick={toggleTheme}>
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </header>

      <main>
        {/* one container for intro, avatar and work, so the avatar can stay pinned beside the list it acts out */}
        <div className="showcase">
          <section className="hero-text">
            <h1 className="visually-hidden">Anri Lombard</h1>
            {/* keyed on theme so the name redraws when the lights change */}
            <Signature key={theme} />
            <p className="intro">Engineer and researcher in AI and software development.</p>
            <p className="hero-links">
              <a href="#work">See my work</a>
              <a href={`mailto:${EMAIL}`}>Email me</a>
            </p>
            {lately && (
              <p className="lately">
                Last public push: <a href={lately.href}>{lately.repo}</a>, {lately.day}
              </p>
            )}
          </section>

          <Avatar dark={theme === "dark"} act={act} lately={lately} />

          <section id="work" className="work-block">
            <h2 className="label">
              Work
              <span className="label-hint on-hover" aria-hidden="true">Hover one and watch</span>
              <span className="label-hint on-touch" aria-hidden="true">Scroll and watch</span>
            </h2>
            <ul className="work" ref={workList}>
              {WORK.map((w) => (
                <li
                  key={w.name}
                  className={act === w.act ? "active" : undefined}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setAct(w.act)}
                  onPointerLeave={(e) => e.pointerType === "mouse" && setAct(null)}
                  onFocus={() => setAct(w.act)}
                  onBlur={() => setAct(null)}
                >
                  <a href={w.href}>
                    <span className="work-name">{w.name}</span>
                    <span className="work-desc">{w.desc}</span>
                    <span className="arrow" aria-hidden="true">&#8599;</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section id="about" className="block about">
          <h2 className="label">About</h2>
          <div className="about-grid">
            <figure className="portrait">
              <Image src={portrait} alt="Illustration of Anri in a black cap and sunglasses, standing at a stone wall above the ocean" placeholder="blur" sizes="(max-width: 700px) 100vw, 260px" />
              <figcaption>That&apos;s me, in animated form.</figcaption>
            </figure>
            <div className="prose">
              <p>I want to build things that measurably improve people&apos;s lives.</p>
              <p>So I spend my time on what excites me and teaches me something, with people I admire.</p>
              <p>That&apos;s my definition of success. From the outside it can look like an unbalanced life, obsessed with a few things, alongside a small number of people.</p>
              <p>To me, this is pure divinity &#127808;</p>
            </div>
          </div>
        </section>

        <section id="contact" className="block">
          <h2 className="label">Contact</h2>
          <div className="contact">
            <a className="email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button className="copy" onClick={copyEmail} aria-live="polite">{copied ? "Copied" : "Copy"}</button>
          </div>
          <p className="elsewhere">
            <a href={GITHUB}>GitHub &#8599;</a>
            <a href={LINKEDIN}>LinkedIn &#8599;</a>
          </p>
        </section>
      </main>

      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} Anri Lombard</span>
      </footer>
    </>
  );
}
