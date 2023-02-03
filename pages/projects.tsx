import Image from 'next/image';
import { useState, useEffect } from 'react';
import DeepLearningImage from '../public/images/DeepLearning.png';

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
            image: DeepLearningImage,
            title: "NLP Specialisation by DeepLearning.AI",
            topic: "Natural Language Processing",
            description: `
                <p> 
                    Completed the NLP Specialisation on Coursera by DeepLearning.AI. This specialisation covered various topics in NLP, 
                    from sentiment analysis, sequence modeling, machine translation, named entity recognition, text classification to attention and transformers. 
                    The following are some of the projects completed as part of the specialisation: 
                    <ol> 
                        <li>Sentiment Analysis of IMDB Reviews</li> 
                        <li>Named Entity Recognition</li> 
                        <li>Text Classification</li> 
                        <li>Machine Translation</li> 
                        <li>Question Answering using Transformers</li> 
                        <li>Building a Chatbot</li> 
                    </ol> 
                </p>
            `,
            link: "https://www.coursera.org/specializations/natural-language-processing",
        },
        {
            id: 2,
            image: DeepLearningImage,
            title: "Deep Learning Specialisation by DeepLearning.AI",
            topic: "Deep Learning",
            description: `
                <p>
                    Completed the Deep Learning Specialisation on Coursera by DeepLearning.AI. This specialisation covered various topics in Deep Learning, 
                    from convolutional neural networks, recurrent neural networks, Generative Adversarial Networks, transfer learning and deep reinforcement 
                    learning. The following are some of the projects completed as part of the specialisation: 
                    <ol> 
                        <li>Digit Recognition using Convolutional Neural Networks</li> 
                        <li>Language Translation using Recurrent Neural Networks</li> 
                        <li>Generating New Images using Generative Adversarial Networks</li> 
                        <li>Using Transfer Learning for Image Recognition</li> 
                        <li>Building a Deep Reinforcement Learning Agent</li> 
                    </ol>  
                </p>
            `,
            link: "https://www.coursera.org/specializations/deep-learning",
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
                                style={{ backgroundColor: backgroundColors[index] }}
                            >
                                <div className="flex md:flex-row flex-col">

                                    <div className="flex w-1/3 justify-center items-center">
                                        <Image src={project.image} alt="Picture of {project.title}" className='rounded-sm' />
                                    </div>

                                    <div className="flex-2 w-2/3 md:ml-10">
                                        <div className="flex-auto flex-grow text-xl font-extrabold hover:text-white transition duration-250 ease-out">
                                            <a href={project.link} target="_blank" rel="noreferrer">{project.title}</a>
                                        </div>
                                        <div className="flex-auto text-sm font-thin">{project.topic}</div>
                                        <div className="pt-5" dangerouslySetInnerHTML={{ __html: project.description }}></div>
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