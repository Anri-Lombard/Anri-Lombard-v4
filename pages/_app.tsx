import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Martian_Mono, Schibsted_Grotesk } from "next/font/google";

const body = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-body" });
const mono = Martian_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${body.variable} ${mono.variable} app`}>
      <Component {...pageProps} />
    </div>
  );
}
