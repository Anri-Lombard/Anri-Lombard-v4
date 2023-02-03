import Image from 'next/image';
import { useState, useEffect } from 'react';
import DeepLearningImage from '../public/images/DeepLearning.png';
import Stanford from '../public/images/Stanford.png';
import IBM from '../public/images/IBM.png';

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
            link: "https://www.coursera.org/account/accomplishments/specialization/certificate/U5BW53ZZNWCU",
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
            link: "https://www.coursera.org/account/accomplishments/specialization/certificate/N3RKPLZN6H2S",
        },
        {
            id: 3,
            image: DeepLearningImage,
            title: "GANS Specialisation by DeepLearning.AI",
            topic: "Generative Adversarial Networks",
            description: `
                <p> 
                    <span>
                        Completed the GANS Specialisation on Coursera by DeepLearning.AI. This specialisation covered various topics in Generative Adversarial 
                        Networks, from generative models, adversarial loss, cycle consistency loss to multi-player GANs and Wasserstein GANs. The following are 
                        some of the projects completed as part of the specialisation: 
                    </span>
                    
                    <ol> 
                        <li>Generating new images with Generative Adversarial Networks</li> 
                        <li>Semi-Supervised Learning with GANs</li> 
                        <li>Image-to-Image Translation with Cycle Consistency Loss</li> 
                        <li>Multi-Player GANs for generating new data distributions</li> 
                        <li>Wasserstein GANs for improved stability and performance</li> 
                    </ol> 
                </p>
            `,
            link: "https://www.coursera.org/account/accomplishments/specialization/certificate/PT2AYCUE3XDY",
        },
        {
            id: 4,
            image: DeepLearningImage,
            title: "AI for Medicine Specialisation by DeepLearning.AI",
            topic: "Artificial Intelligence for Medicine",
            description: `
                <p> 
                    Completed the Medical AI Specialisation on Coursera by DeepLearning.AI. This specialisation covered various topics in medical image analysis, 
                    from image segmentation, image classification, object detection to building end-to-end medical imaging workflows. The following are some of 
                    the projects completed as part of the specialisation: 
                    <ol> 
                        <li>Automated Lung Cancer Screening with Chest X-rays</li> 
                        <li>Skin Lesion Analysis for Melanoma Detection</li> 
                        <li>Brain Tumor Segmentation with MRI Scans</li> 
                        <li>Building a Pneumonia Detection System using Chest X-rays</li> 
                        <li>Multi-modal Brain Tumor Segmentation with MRI and Histology Images</li> 
                    </ol> 
                </p>
            `,
            link: "https://www.coursera.org/account/accomplishments/specialization/certificate/PYFZ5YHDR48V",
        },
        {
            id: 5,
            image: Stanford,
            title: "Machine Learning Specialisation by DeepLearning.AI and Stanford University",
            topic: "Machine Learning",
            description: `
                <p> 
                    Completed the Machine Learning Specialisation on Coursera by DeepLearning.AI and Stanford. This specialisation covered various topics in Supervised and 
                    Unsupervised Learning, including linear regression, logistic regression, clustering, dimensionality reduction, and deep learning. The following 
                    are some of the projects completed as part of the specialisation: 
                    <ol> 
                        <li>Predicting Housing Prices with Linear Regression</li> 
                        <li>Classifying Handwritten Digits with Logistic Regression</li> 
                        <li>Clustering Customer Segments with K-Means</li> 
                        <li>Reducing Data Dimensions with PCA</li> 
                        <li>Building a Handwritten Digit Recognition System with Deep Learning</li> 
                    </ol> 
                </p>
            `,
            link: "https://www.coursera.org/account/accomplishments/specialization/certificate/A8QJ9M8LQ3Z8",
        },
        {
            id: 6,
            image: DeepLearningImage,
            title: "MLOps Specialisation by DeepLearning.AI",
            topic: "Machine Learning Engineering for Production",
            description: `
                <p> 
                    Completed the MLOps Specialisation on Coursera by DeepLearning.AI. This specialisation covered various topics in Machine Learning Engineering 
                    for Production, from model deployment, CI/CD pipeline, monitoring, and scaling to disaster recovery. The following are some of the projects 
                    completed as part of the specialisation: 
                    <ol> 
                        <li>Deploying Machine Learning Models on a Cloud Infrastructure</li> 
                        <li>Building a Continuous Integration and Continuous Deployment pipeline for ML models</li> 
                        <li>Monitoring and Debugging ML Models in Production</li> 
                        <li>Scaling ML Models for High Traffic Applications</li> 
                        <li>Implementing Disaster Recovery for ML models</li> 
                    </ol> 
                </p>
            `,
            link: "https://www.coursera.org/account/accomplishments/specialization/certificate/FP2F6K9ZRB2L",
        },
        {
            id: 5,
            image: IBM,
            title: "Data Science Project for IBM Skills Network Specialisation",
            topic: "Data Science and Machine Learning",
            description: `
                <p> 
                    Completed a project as part of the IBM Data Science Specialisation by IBM Skills Network on Coursera. The project involved using data science 
                    and machine learning techniques to solve a real-world business problem. The following were the steps involved: 
                    <ol> 
                        <li>Data collection and preprocessing from various sources</li> 
                        <li>Exploratory Data Analysis to understand the data and relationships between variables</li> 
                        <li>Feature Engineering to create new variables that are meaningful for the problem</li> 
                        <li>Model selection and training using various algorithms such as Linear Regression, Random Forest and Gradient Boosting</li> 
                        <li>Model evaluation and hyperparameter tuning to improve performance</li>
                    </ol> 
                </p>
            `,
            link: "https://www.coursera.org/specializations/ibm-data-science",
            }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            const bgColors: any = [];
            projects.forEach(() => {
                bgColors.push(getRandomColor());
            })
            setBackgroundColors(bgColors);
        }, 2000);
        return () => clearInterval(interval);
    });

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
                                <a href={project.link} target="_blank" rel="noreferrer">
                                    <div className="flex md:flex-row flex-col">

                                        <div className="flex w-1/3 justify-center items-center">
                                            <Image src={project.image} alt="Picture of {project.title}" className='rounded-sm' />
                                        </div>


                                        <div className="flex-2 w-2/3 md:ml-10">
                                            <div className="flex-auto flex-grow text-xl font-extrabold hover:text-white transition duration-250 ease-out">
                                                {project.title}
                                            </div>
                                            <div className="flex-auto text-sm font-thin">{project.topic}</div>
                                            <div className="pt-5" dangerouslySetInnerHTML={{ __html: project.description }}></div>
                                        </div>

                                    </div>
                                </a>
                            </button>
                        ))
                    }
                </div>

            </div>
        </>

    )
}

export default Projects;