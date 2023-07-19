import Image from 'next/image';
import AnriIMG from '../public/images/Anri.png';
import Head from 'next/head';
import React from "react";


function About() {

    return (
        <>
            <Head>
                <title>Anri Lombard - About</title>
                <meta name="description" content="Personal information and introduction" />
            </Head>
            <div className="min-h-screen flex flex-col mx-10">
                <div className="page-intro">
                    About
                </div>
                <div className="mt-10 flex-auto w-full lg:w-1/2 xl:w-1/3 border-solid border-2 border-[#e0f2fe] rounded-sm self-center">
                    <Image src={AnriIMG} alt="Profile Picture" layout="responsive" width={640} height={427} className="object-cover rounded-sm" />
                </div>
                <div className="flex flex-col mt-10 profile">
                    <div className="flex flex-col">
                        <span className="profile-item-1">
                            <strong>That&apos;s me</strong>. Now, I know what you&apos;re thinking: &quot;Have you always been this short?&quot; Well...
                        </span>
                        <span className="profile-item-2">
                            In <strong>2002</strong>, a jaw-dropping, dirty-blonde, hazel-brown-eyed demigod baby was born, destined to grace the covers of GQ...
                            and right next to him, I made my grand entrance just a few minutes later. While a future of magazine covers and chiseled abs awaited him,
                            I realized early on that <strong>my path would lead to nerdom, glorious nerdom</strong>.
                        </span>
                        <span className="profile-item-1">
                            Embracing my inner geek, <strong>I study Computer Science and Mathematical Statistics at the University of Cape Town</strong>.
                        </span>
                        <span className="profile-item-2">
                            But I don&apos;t just stop there. Most of my learning happens outside the hallowed halls of Uni, thanks to the ever-expanding universe of online education. It&apos;s there that I dive headfirst into the world of <strong>Machine Learning</strong>, aspiring to make a difference as a code wizard... err, I mean, engineer. <strong>My days are filled with a bunch of coding and studying</strong>, which not only makes me happy, but has the added benefit of never challenging me to a bench press competition 😄.
                        </span>

                    </div>
                </div>


            </div>
        </>
    )
}

export default About