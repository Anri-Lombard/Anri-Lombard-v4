import { useState } from 'react';

function Learning() {
    const [learning, setLearning] = useState({
        "university": [
            {
                name: "MAM1000W",
                rating: 4,
                description: "The only drawback this course had was it's occurence during Covid, so I couldn't interact with lecturers to grasp the content well, but the math recap from high school was fantastic!",
            },
            {
                name: "MAM2000W",
                rating: 5,
                description: "This course was made up of 4 modules: (1) Linear Algebra, (2) Advanced Calculus, (3) Real Analysis",
            },
            {
                name: "MAM1019H",
                rating: 2,
                description: "Besides a very interresting and helpful tutor, this course did not do the mathematics justice. The self study led me down a rabit hole of desciphering proofs, which was useful",
            },
            {
                name: "MAM1008S",
                rating: 4,
                description: "Some introductory Linear Algebra was taught, which gave a new dimension to my hing-school-math brain. Overall it was a small and easily-digestible course",
            },
            {
                name: "CSC1015F",
                description: "[Rating: 3/5] This was an introductory course using Python. The content was targetted at beginners, so frustrated me. The most difficult section was Recursion, which proved to be the most exciting part of the course",
            },
            {
                name: "CSC1016S",
                rating: 4,
                description: "This introductory Data Structures in Java course included learning about types of tree structures, linked lists, heaps, and other fundamental structures. I already did most of the content on MIT Opencourseware, but UCT allowed some hands-on experience",
            },
            {
                name: "STA1006S",
                rating: 5,
                description: "This introductory statistics course was by far the most difficult course for me, since I've never done stats in school. It was filled with nascent ideas and important distributions in statistics that captivate me to this day - because of the difficulty of this course I was determined to major in statistics",
            },
            {
                name: "CSC2001F",
                rating: 4,
                description: "We learned about Database design, the Unix environment, and Advanced Data Structures such as graphs and hash tables. The assignments were decently challenging and the in-person experience of programming in groups quite energizing",
            },
            {
                name: "CSC2002S",
                rating: 5,
                description: "We got to learn about Parallel and Concurrent programming, Mobile Design, and Architecture, and got to build an application, write a few thousand-word-long essays, and work with assembly code. I was in literal awe during the entire course",
            },
            {
                name: "STA2004F",
                rating: 5,
                description: "This course is known as the most difficult in all of UCT science, or at least advertised as such by tutors. The course coverred fundamental derivation of Likelihoods, distributions, and construction of confidence intervals (etc), but the lasting impression of passing this course well goes beyond it's content",
            },
            {
                name: "STA2005S",
                rating: 5,
                description: "Another great, challenging statistics course, which delved into regression and experimental design. I've learned how hard interpreting results are and how complicated 'the truth' actually is, that there is no single statistic to help with conclusions, and that group work on assignments beats working alone (wink wink)",
            },
            {
                name: "CSC2005Z",
                rating: 4,
                description: "A computer science research course for academically-inclined students. The research content was mildy interresting (Knowledge Representation), but more enjoyable was that I got to program a website and GUI, learn how to present my findings in a report and present it to scientists. It was mostly self-study, which I liked most",
            }
        ],
        "outside": [
            {
                name: "Deeplearning Specialization",
                rating: 100,
                description: "It is no exhageration that this is the single most intriguing course I've ever done. It introduced gradient descent, forward and backward propogation, and what to focus on when building deeplearning models, amongst many other topics. The lecturer, Andrew Ng, has been an inspirational figure to me ever since"
            }
        ]
    })
    interface ILearning {
        name: string,
        description: string,
        rating: number
    }

    const flip = (course: { name: string; rating: number; description: string; } | { name: string; description: string; rating?: undefined; }) => {
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
        if (element.innerHTML === course.description)
            element.innerHTML = course.name
        else
            element.innerHTML = course.description
        
    }


    return (
        <div className="min-h-screen flex flex-col mx-10">
            <div className="page-intro">
                Learning
            </div>
            <h3 className="heading">University</h3>
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
            <div className="box-container">
                {
                    learning['outside'].map(course => (
                        <button 
                            key={course.name} 
                            id={course.name} 
                            className="box transition duration-150 ease-out hover:ease-in"
                            onClick={() => flip(course)}
                        >
                            <div>{course.name}</div>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default Learning;