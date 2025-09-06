import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ReactTyped } from "react-typed";
import { JetBrains_Mono } from "next/font/google";
import { useState } from "react";

const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"] });

const Home: NextPage = () => {
  const [done1, setDone1] = useState(false);
  const [done2, setDone2] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>Anri Lombard</title>
        <meta name="description" content="Personal website of Anri Lombard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} min-h-[70vh]`}>
        <div className="mx-auto max-w-4xl bg-black/40 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-2xl ring-1 ring-white/10">
          <h1
            className={`${jetbrains.className} text-white text-4xl md:text-6xl font-extrabold text-center leading-tight tracking-tight drop-shadow-md`}
          >
            A nerd and engineer
            {" "}
            <span className="inline-block align-baseline">
              <ReactTyped
                strings={["with a dash of humour 🙂"]}
                typeSpeed={50}
                startDelay={500}
                showCursor
                loop={false}
                className={done1 ? "typed-done" : ""}
                onComplete={(self) => {
                  setDone1(true);
                  // Hide the cursor once typing finishes
                  // @ts-ignore - react-typed wraps typed.js which exposes `cursor`
                  if (self && (self as any).cursor) {
                    // @ts-ignore
                    (self as any).cursor.style.display = "none";
                  }
                }}
              />
            </span>
          </h1>
          <p
            className={`${jetbrains.className} text-white/95 text-lg md:text-2xl text-center mt-6 mx-auto max-w-3xl`}
          >
            <ReactTyped
              strings={[
                "I aspire to engineer products that tangibly and measurably improve people's lives",
              ]}
              typeSpeed={32}
              startDelay={2200}
              showCursor
              loop={false}
              className={done2 ? "typed-done" : ""}
              onComplete={(self) => {
                setDone2(true);
                // Hide the cursor once typing finishes
                // @ts-ignore
                if (self && (self as any).cursor) {
                  // @ts-ignore
                  (self as any).cursor.style.display = "none";
                }
              }}
            />
          </p>
          <div className="mt-8 md:mt-10 text-center text-white/90 leading-relaxed">
            <p className={`${jetbrains.className} text-base md:text-lg`}>
              My philosophy is to dedicate time to what excites and inspires learning, with people I admire.
            </p>
            <p className={`${jetbrains.className} text-base md:text-lg mt-4`}>
              This simple recipe is my definition of success, leading to a perceived unbalanced life, seemingly obsessed on doing a few things all of the time, alongside a small amount of people...
            </p>
            <p className={`${jetbrains.className} text-base md:text-lg mt-4`}>
              To me, this is pure divinity 🍀
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
