import type { NextPage } from 'next'
import Head from 'next/head'
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
        <div className="m-10 text-2xl font-extrabold text-center">
          Welcome to Anri Lombard&apos;s website!
        </div>
        <div className="font-thin text-xl mb-5 text-center max-w-7xl">
          The home of a professional ice skater and now Quidditch coach extraordinaire. 
          Ready to embark on an adventure filled with twists and turns? Then join us as we 
          delve into his life. 
        </div>
        <div className="font-normal text-lg font-sans hover:font-semibold hover:text-xl transition duration-250 ease-in-out">
          <Link href="/about">🔍 Get to know Anri</Link>
        </div>
        <div className="font-normal text-lg font-sans hover:font-semibold hover:text-xl  transition duration-250 ease-in-out">
          <Link href="/learning">📚 Discover his interests</Link>
        </div>
        <div className="font-normal text-lg font-sans hover:font-semibold hover:text-xl  transition duration-250 ease-in-out">
          <Link href="/projects">💻 Explore his projects</Link>
        </div>
        <div className="font-normal text-lg font-sans hover:font-semibold hover:text-xl  transition duration-250 ease-in-out">
          <Link href="/contact">📩 Get in touch</Link>
        </div>
        <div className="font-normal text-lg font-sans hover:font-semibold hover:text-xl  transition duration-250 ease-in-out">
          <Link href="https://anri-lombard.github.io/">💬 Read his thoughts</Link>
        </div>
      </main>
    </div>
  )
}

export default Home
