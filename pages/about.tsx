import Image from 'next/image';
import AnriIMG from '../public/images/Anri.jpg';
import Head from 'next/head';
import React, { useState, useEffect } from "react";


function About() {

    const [backgroundColor, setBackgroundColor] = useState("");

    function getRandomColor() {
        const colors = ['#1abc9c', '#3498db', '#9b59b6', '#f1c40f', '#e74c3c'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundColor(getRandomColor());
        }, 3000);
        return () => clearInterval(interval);
    }, []);

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
                <div className="xl:hidden mt-10 flex-auto w-1/2 lg:w-1/3 border-solid border-2 border-white rounded-sm xl:w-full profile-img self-center">
                    <Image src={AnriIMG} alt="Profile Picture" />
                </div>
                <div className="flex m-10 profile">
                    <div className="hidden xl:block w-1/3 self-center border-solid border-2 border-white rounded-sm" style={{ backgroundColor: backgroundColor }}>
                        <Image src={AnriIMG} alt="Profile Picture" />
                    </div>
                    <div className="w-2/3 flex flex-col">
                        <span className="profile-item-1">
                            👈 <strong>That's me</strong>. Now, I know what you're thinking: How did it end up like this...
                        </span>
                        <span className="profile-item-2" style={{ backgroundColor: backgroundColor }}>
                            In <strong>2002</strong>, a beautiful, dirty-blonde, hazel-brown-eyed demi-god baby was born, clearly destined to be a Greek God...
                            and right next to him I popped out a few minutes later. A future as an award-winning, ripped model was inevitable...
                            for him, that is. I knew then and there <strong>my life would lead to being a nerd, a full-time nerd</strong>.
                        </span>
                        <span className="profile-item-1">
                            That's why <strong>I study Computer Science and Mathematical Statistics at the University of Cape Town</strong>.
                        </span>
                        <span className="profile-item-2" style={{ backgroundColor: backgroundColor }}>
                            Most of my learning, however, is done outside of Uni, given the growing world-class education offered online. There I pursue
                            a deeper understanding of <strong>Machine Learning</strong>, hoping to add some good to the world as a software addict... uh hum, I mean
                            engineer. <strong>My days are mostly filled with coding and studying</strong>, since these things seem to make me happy, and neither can bench more
                            than me 😄.
                        </span>
                    </div>
                </div>


            </div>
        </>
    )
}

export default About