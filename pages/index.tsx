import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Anri Lombard</title>
        <meta name="description" content="The website of a professional ice skater that just signed up to be Harry's Quidditch coach!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="m-10 text-4xl font-extrabold text-center">
          Welcome to Anri Lombard&apos;s website!
        </div>
        <div className="font-semibold text-2xl mb-10 text-center text-[#6b7280] max-w-2xl mx-auto">
          The website of a professional ice skater, Quidditch coach extraordinaire, and Sadie Green&apos;s future husband.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="transition duration-300 ease-in-out transform hover:scale-105 bg-[#93c5fd] text-[#1e3a8a] p-4 rounded-md text-center cursor-pointer">
            <Link href="/about">🔍 Get to know Anri</Link>
          </div>
          <div className="transition duration-300 ease-in-out transform hover:scale-105 bg-[#a7f3d0] text-[#064e3b] p-4 rounded-md text-center cursor-pointer">
            <Link href="/learning">📚 Discover his interests</Link>
          </div>
          <div className="transition duration-300 ease-in-out transform hover:scale-105 bg-[#fbcfe8] text-[#8b5cf6] p-4 rounded-md text-center cursor-pointer">
            <Link href="/projects">💻 Explore his projects</Link>
          </div>
          <div className="transition duration-300 ease-in-out transform hover:scale-105 bg-[#fde68a] text-[#b45309] p-4 rounded-md text-center cursor-pointer">
            <Link href="/contact">📩 Get in touch</Link>
          </div>
          <div className="transition duration-300 ease-in-out transform hover:scale-105 bg-[#f9a8d4] text-[#be185d] p-4 rounded-md text-center cursor-pointer">
            <Link href="https://anri-lombard.github.io/">💬 Read his thoughts</Link>
          </div>
          <div className="transition duration-300 ease-in-out transform hover:scale-105 bg-[#c7d2fe] text-[#1e40af] p-4 rounded-md text-center cursor-pointer">
            <a href="https://github.com/Anri-Lombard" target="_blank" rel="noopener noreferrer">📁 View his GitHub</a>
          </div>
          <div className="transition duration-300 ease-in-out transform hover:scale-105 bg-[#e0e7ff] text-[#1d4ed8] p-4 rounded-md text-center cursor-pointer">
            <a href="https://www.linkedin.com/in/anri-lombard-ab37ab201/" target="_blank" rel="noopener noreferrer">🔗 Connect on LinkedIn</a>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Home
