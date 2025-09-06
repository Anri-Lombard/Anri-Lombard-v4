import Image from "next/image";
import PersonalIMG from "../public/images/personal.png";
import Head from "next/head";
import React from "react";
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"] });

function About() {
  return (
    <>
      <Head>
        <title>Anri Lombard - About</title>
        <meta
          name="description"
          content="Personal information and introduction"
        />
      </Head>
      <div className="flex flex-col mx-6 md:mx-10">
        <div className="mt-10 w-full lg:w-1/2 xl:w-1/3 self-center border-solid border-2 border-[#e0f2fe] rounded-sm overflow-hidden">
          <Image
            src={PersonalIMG}
            alt="Profile Picture"
            layout="responsive"
            width={640}
            height={427}
            className="object-cover"
          />
        </div>
        <div className="mt-10 mx-auto w-full max-w-4xl bg-black/40 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-2xl ring-1 ring-white/10 mb-24 md:mb-32">
          <p className={`${jetbrains.className} text-white text-xl md:text-2xl text-center leading-relaxed`}>
            That&apos;s me... in animated form. I&apos;m studying artificial intelligence and engineering software products
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
