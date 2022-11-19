import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Anri Lombard</title>
        <meta name="description" content="The website of a professional ice skater that just signed up to be Harry's Quidditch coach! " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="m-10 text-2xl font-extrabold">
          Welcome to Anri Lombard&apos;s website!
        </div>
        <div className="font-thin text-xl mb-5">
          This dude is really weird, so here is an intelligence briefing conducted by our top dementors:
        </div>
        <div className="font-normal text-lg font-sans hover:font-semibold hover:text-xl transition duration-250 ease-in-out">
          <Link href="/about">about himself</Link>
        </div>
        <div className="font-normal text-lg font-sans hover:font-semibold hover:text-xl  transition duration-250 ease-in-out">
          <Link href="/learning">about his suspicious subject interrests</Link>
        </div>
        <div className="font-normal text-lg font-sans hover:font-semibold hover:text-xl  transition duration-250 ease-in-out">
          <Link href="/projects">about traces of software he uses to spy on Hermione</Link>
        </div>
        <div className="font-normal text-lg font-sans hover:font-semibold hover:text-xl  transition duration-250 ease-in-out">
          <Link href="/contact">about contacts we found with rare occurrences of actually provoking response</Link>
        </div>
        <div className="font-normal text-lg font-sans hover:font-semibold hover:text-xl  transition duration-250 ease-in-out">
          <Link href="https://anri-lombard.github.io/">about his attempt to persuade armies of followers with his words</Link>
        </div>
      </main>
    </div>
  )
}

export default Home
