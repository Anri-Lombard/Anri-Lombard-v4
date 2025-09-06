import Head from "next/head";
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"] });

function Contact() {
  return (
    <>
      <Head>
        <title>Anri Lombard - Contact</title>
        <meta name="description" content="Contact information" />
      </Head>
      <div className="flex flex-col mx-6 md:mx-10">
        <div className="mt-10 mx-auto w-full max-w-2xl bg-black/40 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-2xl ring-1 ring-white/10 mb-24 md:mb-32 text-center">
          <p className={`${jetbrains.className} text-white text-xl md:text-2xl`}>
            Personal email:
          </p>
          <p className={`${jetbrains.className} text-white text-2xl md:text-3xl mt-3 font-semibold`}>
            <a href="mailto:anri.m.lombard@gmail.com" className="underline decoration-white/60 hover:decoration-white transition">
              anri.m.lombard@gmail.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Contact;
