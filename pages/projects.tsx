import Image from 'next/image';
import CodingInterviewUniImage from '../public/images/CIU.png';
import MicrogradImage from '../public/images/Micrograd.jpeg';
import MakemoreImage from '../public/images/Makemore.jpeg';
import GANSImage from '../public/images/GANS.jpeg';
import DefeasibleReasoningToolImage from '../public/images/DefeasibleReasoning.png';
import DeepLearningImage from '../public/images/DeepLearning.jpeg';
import RocketImage from '../public/images/Rocket.png';
import MLForEveryoneImage from '../public/images/MLForEveryone.jpeg';
import IBMDataScienceImage from '../public/images/IBMDataScience.jpeg';
import {useState, useEffect} from 'react';

import Head from 'next/head';

function Projects() {
    const [backgroundColors, setBackgroundColors] = useState([]);

    function getRandomColor() {
        const colors = ['#1abc9c', '#3498db', '#9b59b6', '#f1c40f', '#e74c3c'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }


    const projects = [
        {
            id: 1,
            image: CodingInterviewUniImage,
            title: "Coding Interview University",
            topic: "Education",
            description: "Helping students prepare for coding interviews, created by an Amazon engineer that came from a background without a CS degree.",
            link: "https://github.com/jwasham/coding-interview-university",
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            const bgColors = [];
            projects.forEach(() => {
                bgColors.push(getRandomColor());
            })
            setBackgroundColors(bgColors);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Head>
                <title>Anri Lombard - Projects</title>
                <meta name="description" content="Built projects and open source contributions" />
            </Head>
            <div className="min-h-screen flex flex-col mx-10">
                <div className="page-intro">
                    Projects
                </div>


                <div className="box-container md:m-10">
                    <h4 className="heading_2">I am mostly interested in machine learning, although web and game development are fun hobbies I will sometimes delve into</h4>
                    {
                        projects.map((project, index) => (
                            <button
                                key={index}
                                className="project transition duration-150 ease-out hover:ease-in"
                                style={{ backgroundColor: backgroundColors[index]}}
                            >
                                <div className="flex md:flex-row flex-col">
                                    
                                    <div className="flex-col md:drop-shadow-xl drop-shadow-sm">
                                        <Image src={project.image} alt="Picture of {project.title}" className='rounded-sm adaptive-image' />
                                    </div>
                                    <div className="flex-col md:ml-10">
                                        <div className="flex-auto flex-grow text-xl font-extrabold hover:text-white transition duration-250 ease-out">
                                            <a href={project.link} target="_blank" rel="noreferrer">{project.title}</a>
                                        </div>
                                        <div className="flex-auto text-sm font-thin">{project.topic}</div>
                                        <div className="pt-5">{project.description}</div>
                                    </div>

                                </div>
                            </button>
                        ))
                    }
                </div>

            </div>
        </>
        
    )
}

export default Projects;