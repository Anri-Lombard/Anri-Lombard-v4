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

import Head from 'next/head';

function Projects() {
    const projects = [
        {
            id: 1,
            image: CodingInterviewUniImage,
            title: "Coding Interview University",
            topic: "Education",
            description: "Helping students prepare for coding interviews, created by an Amazon engineer that came from a background without a CS degree.",
            link: "https://github.com/jwasham/coding-interview-university",
        },
        {
            id: 2,
            image: MicrogradImage,
            title: "Micrograd",
            topic: "Machine Learning",
            description: "A small Autograd library for Machine Learning, created by Andrej Karpathy, that builds out the basic functionality of scalar forward and backward passes used in training neural networks. It gives a fundamental understanding of what PyTorch does without all the complexity added for efficiency.",
            link: "https://github.com/Anri-Lombard/micrograd",
        },
        {
            id: 3,
            image: MakemoreImage,
            title: "Makemore",
            topic: "Machine Learning",
            description: "An autoregressive character-level language model for making more things built initially by Andrej Karpathy. In this project, we went from using a basic bag-of-words model to completely deriving backward propagation from scratch using in-depth calculus and statistics. This project is ongoing, and we expect to build the model with a transformer once we near the end.",
            link: "https://github.com/karpathy/makemore",
        },
        {
            id: 4,
            image: GANSImage,
            title: "Various Generative Adversarial Network (GAN) Models",
            topic: "Machine Learning",
            description: "As part of a specialization on Adversarial Networks, we got to build 3-4 assignment projects for each of the 3 courses in the specialization. They ranged from simple digit classification to generating images, poetry, and music.",
            link: "https://github.com/karpathy/makemore",
        },
        {
            id: 5,
            image: DefeasibleReasoningToolImage,
            title: "Defeasible Reasoning Tool",
            topic: "Knowledge Representation Research",
            description: "As part of an academically challenging research course in university, I built a \"Knowledge Representation Tool to Assist in Rational Closure Diagnosis\" which included the website and a GUI, which both allowed Novice researchers easier access to Rational Closure information and Experts to a GUI that allowed them to easily get conclusions from a given defeasible query.",
            link: "https://defeasible-reasoning.vercel.app/",
        },
        {
            id: 6,
            image: DeepLearningImage,
            title: "Various Deep Learning Models",
            topic: "Machine Learning",
            description: "As part of a specialization on Deep Learning by Andrew Ng, a leading researcher in the field and professor at Stanford University, we got to build 3-4 models for each of the 5 courses ranging from simple Neural Network understanding to Convolutional Neural Networks and Recurrent Neural Networks and Sequence Models. Andrew also explained what it takes to build useful models effectively.",
            link: "https://github.com/Anri-Lombard/Deep-Learning-Specialization",
        },
        {
            id: 7,
            image: RocketImage,
            title: "Boost",
            topic: "Game Development",
            description: "A Unity-Engine-built rocket game built in roughly 4 weeks where a player gets to control a rocket and land it on a platform while dodging obstacles.",
            link: "https://github.com/Anri-Lombard/Boost",
        },
        {
            id: 8,
            image: MLForEveryoneImage,
            title: "Machine Learning for Everyone",
            topic: "Machine Learning",
            description: "A now outdated course, yet legendary course by Andrew Ng that famously proved Coursera is a valid venture and way to teach. This course was entirely done in Matlab, which gave an intuitive feel for Machine Learning at the time, but is no longer very useful.",
            link: "https://github.com/Anri-Lombard/machine-learning-for-everyone",
        },
        {
            id: 9,
            image: IBMDataScienceImage,
            title: "IBM Data Science Specialization",
            topic: "Machine Learning",
            description: "These are my notes and models built alongside the IBM Data Science Specialization lectures, where I learned how to tell stories with the data we have, clean it, and build a model that makes accurate predictions. The models included primitive classification models that emphasize visualization of the results.",
            link: "https://github.com/Anri-Lombard/machine-learning-for-everyone",
        }
    ]
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
                    {
                        projects.map(project => (
                            <button
                                key={project.id}
                                className="project transition duration-150 ease-out hover:ease-in"
                            >
                                <div className="flex md:flex-row flex-col">
                                    
                                    <div className="flex-col md:drop-shadow-xl drop-shadow-sm">
                                        <Image src={project.image} alt="Picture of {project.title}" className='rounded-sm'/>
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