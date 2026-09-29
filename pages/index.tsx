import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Signature from "../components/Signature";
import portrait from "../public/images/personal.png";

// three.js only runs in the browser; the stage keeps its size while it loads
const Avatar = dynamic(() => import("../components/Avatar"), { ssr: false, loading: () => <div className="stage" /> });

type Theme = "light" | "dark";

const EMAIL = "anri.m.lombard@gmail.com";
const GITHUB = "https://github.com/Anri-Lombard";
const LINKEDIN = "https://www.linkedin.com/in/anri-lombard-ab37ab201/";

const WORK = [
  ["sallm", "Reproducible LLM training framework for South African languages."],
  ["Mamba-SAFE", "Generating molecules with the Mamba architecture."],
  ["LearningGatedDeltaNet", "My notes and implementation while learning Gated DeltaNet."],
  ["Mamba-vs-Transformers", "Visualizing state-of-the-art architectures side by side."],
  ["chunking-playground", "Visualize and compare text chunking strategies."],
];

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");
  const [copied, setCopied] = useState(false);

  useEffect(() => setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light"), []);

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
        <meta name="description" content="Anri Lombard, engineer and researcher in AI and software development." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <section className="hero">
          <div className="hero-text">
            <h1 className="visually-hidden">Anri Lombard</h1>
            {/* keyed on theme so the name redraws when the lights change */}
            <Signature key={theme} />
            <p className="intro">Engineer and researcher in AI and software development.</p>
            <p className="hero-links">
              <a href="#work">See my work</a>
              <a href={`mailto:${EMAIL}`}>Email me</a>
            </p>
          </div>
          <Avatar dark={theme === "dark"} />
        </section>

        <section id="work" className="block">
          <h2 className="label">Work</h2>
          <ul className="work">
            {WORK.map(([name, desc]) => (
              <li key={name}>
                <a href={`${GITHUB}/${name}`}>
                  <span className="work-name">{name}</span>
                  <span className="work-desc">{desc}</span>
                  <span className="arrow" aria-hidden="true">&#8599;</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="block about">
          <h2 className="label">About</h2>
          <div className="about-grid">
            <figure className="portrait">
              <Image src={portrait} alt="Illustration of Anri in a black cap and sunglasses, standing at a stone wall above the ocean" placeholder="blur" sizes="(max-width: 700px) 100vw, 260px" />
              <figcaption>That&apos;s me, in animated form.</figcaption>
            </figure>
            <div className="prose">
              <p>I aspire to engineer products that tangibly and measurably improve people&apos;s lives.</p>
              <p>My philosophy is to dedicate time to what excites and inspires learning, with people I admire.</p>
              <p>This simple recipe is my definition of success, leading to a perceived unbalanced life, seemingly obsessed on doing a few things all of the time, alongside a small amount of people...</p>
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
