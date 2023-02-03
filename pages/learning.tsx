import { useEffect, useState } from 'react';
import Head from 'next/head';

function Learning() {

    const [backgroundColors, setBackgroundColors] = useState([]);

    function getRandomColor() {
        const colors = ['#1abc9c', '#3498db', '#9b59b6', '#f1c40f', '#e74c3c'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    const learning = {
        "university": [
            {
                name: "MAM1000W",
                rating: "⭐️⭐️⭐️⭐️",
                description: "The only drawback this course had was its occurrence during Covid, so I couldn't interact with lecturers to grasp the content well, but the math recap from high school was fantastic!",
            },
            {
                name: "MAM2000W",
                rating: "⭐️⭐️⭐️⭐️⭐️",
                description: "This course was made up of 4 modules: (1) Linear Algebra, (2) Advanced Calculus, (3) Real Analysis, and (4) Differential Equations; It pushed my friends and me enough to leave lasting memories of joking pretense that we might fail (obviously some of us got 90%+... cough cough)",
            },
            {
                name: "MAM1019H",
                rating: "⭐️⭐️",
                description: "Besides a very interesting and helpful tutor, this course did not do the mathematics justice. The self-study led me down a rabbit hole of deciphering proofs, which was useful, I guess...",
            },
            {
                name: "MAM1008S",
                rating: "⭐️⭐️⭐️⭐️",
                description: "Some introductory Linear Algebra was taught, which gave a new dimension to my high-school-math brain. Overall it was a small and easily-digestible course",
            },
            {
                name: "CSC1015F",
                rating: "⭐️⭐️⭐️",
                description: "This was an introductory course using Python. The content was targeted at beginners, so frustrated me. The most difficult section was Recursion, which proved to be the most exciting part of the course",
            },
            {
                name: "CSC1016S",
                rating: "⭐️⭐️⭐️⭐️",
                description: "This introductory Data Structures in Java course included learning about types of tree structures, linked lists, heaps, and other fundamental structures. I already did most of the content on MIT OpenCourseWare, but UCT allowed some hands-on experience",
            },
            {
                name: "STA1006S",
                rating: "⭐️⭐️⭐️⭐️⭐️",
                description: "This introductory statistics course was by far the most difficult course for me since I've never done stats in school. It was filled with nascent ideas and important distributions in statistics that captivate me to this day - because of the difficulty of this course I was determined to major in statistics",
            },
            {
                name: "CSC2001F",
                rating: "⭐️⭐️⭐️⭐️",
                description: "We learned about Database design, the Unix environment, and Advanced Data Structures such as graphs and hash tables. The assignments were decently challenging and the in-person experience of programming in groups quite energizing",
            },
            {
                name: "CSC2002S",
                rating: "⭐️⭐️⭐️⭐️⭐️",
                description: "We got to learn about Parallel and Concurrent programming, Mobile Design, and Architecture, and got to build an application, write a few thousand-word-long essays, and work with assembly code. I was in literal awe during the entire course",
            },
            {
                name: "STA2004F",
                rating: "⭐️⭐️⭐️⭐️⭐️",
                description: "This course is known as the most difficult in all of UCT science, or at least advertised as such by tutors. The course covered fundamental derivation of Likelihoods, distributions, and construction of confidence intervals (etc), but the lasting impression of passing this course well goes beyond its content",
            },
            {
                name: "STA2005S",
                rating: "⭐️⭐️⭐️⭐️⭐️",
                description: "Another great, challenging statistics course, which delved into regression and experimental design. I've learned how hard interpreting results are and how complicated 'the truth' actually is, that there is no single statistic to help with conclusions, and that group work on assignments beats working alone (wink wink)",
            },
            {
                name: "CSC2005Z",
                rating: "⭐️⭐️⭐️⭐️",
                description: "A computer science research course for academically-inclined students. The research content was mildly interesting (Knowledge Representation), but more enjoyable was that I got to program a website and GUI, learn how to present my findings in a report and present it to scientists. It was mostly self-study, which I liked most",
            }
        ],
        "outside": [
            {
                name: "Deep learning Specialization",
                rating: "⭐️⭐️⭐️⭐️⭐️",
                description: "It is no exaggeration that this is the single most intriguing course I've ever done. It introduced gradient descent, forward and backward propogation, and what to focus on when building deep learning models, amongst many other topics. The lecturer, Andrew Ng, has been an inspirational figure to me ever since",
                link: "https://www.coursera.org/account/accomplishments/specialization/N3RKPLZN6H2S"
            },
            {
                name: "GANS Specialization",
                rating: "⭐️⭐️⭐️⭐️⭐️",
                description: "Generative adversarial networks provide an extra perspective on how state-of-the-art neural networks are built",
                link: "https://www.coursera.org/account/accomplishments/specialization/PT2AYCUE3XDY"
            },
            {
                name: "IBM Data Science",
                rating: "⭐️⭐️⭐️⭐️",
                description: "This course was a great overview of Data Science, and I learned about SQL, Python for AI and data analysis, Data Science Methodology, and Machine Learning, all while building a capstone project",
                link: "https://www.coursera.org/account/accomplishments/specialization/PT2AYCUE3XDY"
            },
            {
                name: "Entrepreneurship by Wharton",
                rating: "⭐️⭐️⭐️⭐️",
                description: "As a more technical-minded person, the business side is not my forte. This course taught me about how to (1) develop opportunities, (2) launch a startup, (3) growth strategies, and (4) finance and profitability. Of course, real experience would be an even better teacher",
                link: "https://www.coursera.org/account/accomplishments/specialization/PT2AYCUE3XDY"
            },
            {
                name: "IBM Applied Data Science",
                rating: "⭐️⭐️⭐️⭐️⭐️",
                description: "Learned the practical side to match the theory by building a python capstone project and analyzing the data as part of a 5-course specialization",
                link: "https://www.coursera.org/account/accomplishments/specialization/PT2AYCUE3XDY"
            }
        ]
    }

    interface ILearning {
        name: string,
        description: string,
        rating: number
    }

    const flip = (course: { name: string; rating: string; description: string } | { name: string; rating: number; description: string }) => {
        const element = document.getElementById(course.name);

        if (element == null) {
            return
        }

        // Toggle element style for visibility when clicked
        if (element.classList.contains("scale-150"))
            element.classList.remove("scale-150", "z-10", "drop-shadow-2xl")
        else
            element.classList.add("scale-150", "z-10", "drop-shadow-2xl")

        // Toggle course name and description on click
        if (element.innerHTML === course.description) {
            element.innerHTML = "<pre>" + course.rating + "\n" + course.name + "</pre>"
        } else
            element.innerHTML = course.description

    }

    useEffect(() => {
        const interval = setInterval(() => {
            const bgColors = [];
            learning.university.forEach(() => {
                bgColors.push(getRandomColor());
            })
            setBackgroundColors(bgColors);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Head>
                <title>Anri Lombard - Learning</title>
                <meta name="description" content="Learned information and subject interest" />
            </Head>
            <div className="min-h-screen flex flex-col mx-10 font-sans">
                <div className="page-intro">
                    Learning
                </div>
                <h3 className="heading">University</h3>
                <h4 className="heading_2">My main studies are done at the University of Cape Town with supplements online (Hint: tap the squares!)</h4>
                <div className="box-container">
                    {
                        learning['university'].map((course, index) => (
                            <button
                                key={index}
                                id={course.name}
                                className="box transition duration-150 ease-out hover:ease-in"
                                onClick={() => flip(course)}
                                style={{ backgroundColor: backgroundColors[index]}}
                            >
                                <div>{course.rating}</div>
                                <div>{course.name}</div>
                            </button>
                        ))
                    }
                </div>

                <h3 className="heading">Outside University</h3>
                <h4 className="heading_2">I tend to believe education goes far beyond the classroom, and this is my attempt to validate that hypothesis</h4>
                <div className="box-container">
                    {
                        learning['outside'].map((course, index) => (
                            <button
                                key={index}
                                id={course.name}
                                className="box transition duration-150 ease-out hover:ease-in"
                                onClick={() => flip(course)}
                                style={{ backgroundColor: backgroundColors[index]}}
                            >
                                <div>{course.rating}</div>
                                <div>{course.name}</div>
                            </button>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Learning;