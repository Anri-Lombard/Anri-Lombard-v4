import Image from 'next/image';
import DeepLearningImage from '../public/images/DeepLearning.png';
import NLP from '../public/images/NLP.jpeg';
import GANS from '../public/images/GANS.png';
import AIMed from '../public/images/AIMed.jpeg';
import MachineLearning from '../public/images/MachineLearning.jpeg';
import MLOps from '../public/images/MLOps.png';
import DataScience from '../public/images/DataScience.jpeg';
import AIForGood from '../public/images/AIForGood.jpeg';

import projects from '../database/projects.json';

import Head from 'next/head';

function Projects() {
    // Map string values to actual images
    const images: any = {
        DeepLearningImage,
        NLP,
        GANS,
        AIMed,
        MachineLearning,
        MLOps,
        DataScience,
        AIForGood
    };

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

                <div className="box-container md:m-10 mt-10 grid md:grid-cols-2 gap-4">
                    <h4 className="heading_2 col-span-full">I am mostly interested in machine learning, although web and game development are fun hobbies I will sometimes delve into</h4>
                    {
                        projects.map((project, index) => (
                            <div key={index} className="project card border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                                <a href={project.link} target="_blank" rel="noreferrer">
                                    <div className="flex flex-col">

                                        <div className="flex justify-center items-center">
                                            <Image src={images[project.image]} alt={`Picture of ${project.title}`} width={500} height={300} className="adaptive-image rounded-sm" />
                                        </div>

                                        <div className="flex-2 p-5">
                                            <div className="flex-auto flex-grow text-xl font-extrabold hover:text-primary transition duration-250 ease-out">
                                                {project.title}
                                            </div>
                                            <div className="flex-auto text-sm font-thin">{project.topic}</div>
                                            <div className="pt-5" dangerouslySetInnerHTML={{ __html: project.description }}></div>
                                        </div>

                                    </div>
                                </a>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Projects;
