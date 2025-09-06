import Image from "next/image";
import Head from "next/head";
import React from "react";
import PersonalIMG from "../public/images/personal.png";

function About() {
  return (
    <>
      <Head>
        <title>Anri Lombard - About</title>
        <meta name="description" content="About Anri Lombard" />
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <div className="flex flex-col items-center text-center max-w-xl">
          <Image
            src={PersonalIMG}
            alt="Anri Lombard"
            width={160}
            height={160}
            className="rounded-full object-cover"
            priority
          />
          <h1 className="mt-6 text-3xl font-semibold">Anri Lombard</h1>
          <p className="mt-4 text-lg text-gray-700">
            I&apos;m a software engineer and Master&apos;s student in Artificial
            Intelligence at the University of Cape Town.
          </p>
        </div>
      </main>
    </>
  );
}

export default About;
