import { useState } from 'react';

function Learning() {
    const learning = {
        "university": [
            {
                name: "MAM1000W",
                rating: "⭐️⭐️⭐️⭐️",
                description: "The only drawback this course had was it's occurence during Covid, so I couldn't interact with lecturers to grasp the content well, but the math recap from high school was fantastic!",
            },
            {
                name: "MAM2000W",
                rating: "⭐️⭐️⭐️⭐️⭐️",
                description: "This course was made up of 4 modules: (1) Linear Algebra, (2) Advanced Calculus, (3) Real Analysis, and (4) Defferential Equations; It pushed my friends and I enough to leave lasting memories of joking pretence that we might fail (obviously some of us got 90%+... cough cough)",
            },
            {
                name: "MAM1019H",
                rating: "⭐️⭐️",
                description: "Besides a very interresting and helpful tutor, this course did not do the mathematics justice. The self study led me down a rabit hole of desciphering proofs, which was useful, I guess...",
            },
            {
                name: "MAM1008S",
                rating: "⭐️⭐️⭐️⭐️",
                description: "Some introductory Linear Algebra was taught, which gave a new dimension to my hing-school-math brain. Overall it was a small and easily-digestible course",
            },
            {
                name: "CSC1015F",
                rating: "⭐️⭐️⭐️",
                description: "This was an introductory course using Python. The content was targetted at beginners, so frustrated me. The most difficult section was Recursion, which proved to be the most exciting part of the course",
            },
            {
                name: "CSC1016S",
                rating: "⭐️⭐️⭐️⭐️",
                description: "This introductory Data Structures in Java course included learning about types of tree structures, linked lists, heaps, and other fundamental structures. I already did most of the content on MIT Opencourseware, but UCT allowed some hands-on experience",
            },
            {
                name: "STA1006S",
                rating: "⭐️⭐️⭐️⭐️⭐️",
                description: "This introductory statistics course was by far the most difficult course for me, since I've never done stats in school. It was filled with nascent ideas and important distributions in statistics that captivate me to this day - because of the difficulty of this course I was determined to major in statistics",
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
                description: "This course is known as the most difficult in all of UCT science, or at least advertised as such by tutors. The course coverred fundamental derivation of Likelihoods, distributions, and construction of confidence intervals (etc), but the lasting impression of passing this course well goes beyond it's content",
            },
            {
                name: "STA2005S",
                rating: "⭐️⭐️⭐️⭐️⭐️",
                description: "Another great, challenging statistics course, which delved into regression and experimental design. I've learned how hard interpreting results are and how complicated 'the truth' actually is, that there is no single statistic to help with conclusions, and that group work on assignments beats working alone (wink wink)",
            },
            {
                name: "CSC2005Z",
                rating: "⭐️⭐️⭐️⭐️",
                description: "A computer science research course for academically-inclined students. The research content was mildy interresting (Knowledge Representation), but more enjoyable was that I got to program a website and GUI, learn how to present my findings in a report and present it to scientists. It was mostly self-study, which I liked most",
            }
        ],
        "outside": [
            {
                name: "Deeplearning Specialization",
                rating: "⭐️⭐️⭐️⭐️⭐️",
                description: "It is no exhageration that this is the single most intriguing course I've ever done. It introduced gradient descent, forward and backward propogation, and what to focus on when building deeplearning models, amongst many other topics. The lecturer, Andrew Ng, has been an inspirational figure to me ever since",
                link: "https://www.coursera.org/account/accomplishments/specialization/N3RKPLZN6H2S"
            },
            {
                name: "GANS Specialization",
                rating: "⭐️⭐️⭐️⭐️⭐️",
                description: "Generative adverserial networks provide an extra perspective on how state-of-the art neural networks are build",
                link: "https://www.coursera.org/account/accomplishments/specialization/PT2AYCUE3XDY"
            }
        ]
    }
    
    interface ILearning {
        name: string,
        description: string,
        rating: number
    }

    const flip = (course: { name: string; rating: string; description: string; link?: string } | { name: string; rating: number; description: string; link?: string }) => {
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
            course.link != null && course.link != undefined ? element.innerHTML = "<pre>" + course.rating + "\n" + course.name + "\n" + "<a href=" + course.link + " target=\"_blank\" rel=\"noreferrer\">Certificate Here</a></pre>" : element.innerHTML = "<pre>" + course.rating + "\n" + course.name + "</pre>"
        } else
            element.innerHTML = course.description
        
    }


    return (
        <div className="min-h-screen flex flex-col mx-10 font-sans">
            <div className="page-intro">
                Learning
            </div>
            <h3 className="heading">University</h3>
            <h4 className="heading_2">My main studies are done at University of Cape Town with suplements online</h4>
            <div className="box-container">
                {
                    learning['university'].map(course => (
                        <button 
                            key={course.name} 
                            id={course.name} 
                            className="box transition duration-150 ease-out hover:ease-in"
                            onClick={() => flip(course)}
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
                    learning['outside'].map(course => (
                        <button 
                            key={course.name} 
                            id={course.name} 
                            className="box transition duration-150 ease-out hover:ease-in"
                            onClick={() => flip(course)}
                        >
                            <div>{course.rating}</div>
                            <div>{course.name}</div>
                            <div>
                                <a href={course.link} target="_blank" rel="noreferrer">Certificate Here</a>
                            </div>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default Learning;