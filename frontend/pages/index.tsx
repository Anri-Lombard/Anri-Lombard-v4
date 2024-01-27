import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Anri Lombard</title>
        <meta name="description" content="Personal website of Anri Lombard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="mb-5">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Welcome to this guy's website!",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              "Welcome to this SHORT guy's website!",
              1000,
              "Welcome to this KINDA SHORT guy's website!",
              1000,
              "Welcome to this NOT TOO SHORT guy's website!",
              1000,
              "Welcome to Anri Lombard's website! 🙂",
              1000,
              "Be prepared for some Machine Learning and Data Science terminology 😃",
              1000,
              "No AIs have been harmed in the making of this website 😅",
              1000,
              "No AIs have been harmed in the making of this website I think...",
              1000,
              "Let's get on with it shall we? 😁",
              10000,
              "Why are you still here? 😐",
              10000,
              "I'm not sure what you're waiting for 😕",
              10000,
              "You can leave now 😑",
              10000,
              "Seriously, go away 😒",
              10000,
              "I'm not kidding 😠",
              10000,
              "You're still here? 😡",
              10000,
              "I'm going to stop typing now 😤",
              10000,
              "Okay, for real now, I'm done 😭",
              10000,
              "Just check out the rest of the website 😢",
              10000,
              "Please? 😥",
              10000,
              "I'm begging you 😫",
              10000,
              "Fine, I'll keep typing 😩",
              10000,
              "But you're not going to like it 😓",
              10000,
              "I'm going to start typing random stuff 😰",
              10000,
              "Like this 😨",
              10000,
              "And this 😱",
              10000,
              "And this 😵",
              10000,
              "And this 😲",
              10000,
              "And this 😳",
              10000,
              "And this 😦",
              10000,
              "And this 😧",
              10000,
              "And this 😮",
              10000,
              "And this 😬",
              10000,
              "And this 😑",
              10000,
              "And this 😐",
              10000,
              "And this 😶",
              10000,
              "And this 😯",
              10000,
              "And this 😦",
              10000,
              "Do you have any idea how long it takes to type all of this? 😧",
              10000,
              "For real, the next time you visit this website, I'm going to have a chatbot that will tell you to go away 😡",
              10000,
              "Love you 😘",
              10000,
              "Bye 😊",
              10000,
              "",
              9999999999
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '2em', display: 'inline-block' }}
            repeat={Infinity}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          <div className="transition duration-300 ease-in-out transform hover:scale-105 bg-[#93c5fd] text-[#1e3a8a] p-4 rounded-md text-center cursor-pointer">
            <Link href="/about">🔍 Get to know Anri</Link>
          </div>
          <div className="transition duration-300 ease-in-out transform hover:scale-105 bg-[#a7f3d0] text-[#064e3b] p-4 rounded-md text-center cursor-pointer">
            <Link href="/learning">📚 Discover his interests</Link>
          </div>
          <div className="transition duration-300 ease-in-out transform hover:scale-105 bg-[#fbcfe8] text-[#8b5cf6] p-4 rounded-md text-center cursor-pointer">
            <Link href="/projects">💻 Have some FUN!</Link>
          </div>
          <div className="transition duration-300 ease-in-out transform hover:scale-105 bg-[#fde68a] text-[#b45309] p-4 rounded-md text-center cursor-pointer">
            <Link href="/contact">📩 Get in touch</Link>
          </div>
          {/* <div className="transition duration-300 ease-in-out transform hover:scale-105 bg-[#f9a8d4] text-[#be185d] p-4 rounded-md text-center cursor-pointer">
            <Link href="https://anri-lombard.github.io/">💬 Read his thoughts</Link>
          </div> */}
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
