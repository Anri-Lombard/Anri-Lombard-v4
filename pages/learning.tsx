import { useState } from 'react';

function Learning() {
    const [learning, setLearning] = useState({
        "university": [
            {
                name: "MAM1000W",
                description: "[Rating: 4/5] The only drawback this course had was it's occurence during Covid, so I couldn't interact with lecturers to grasp the content well, but the math recap from high school was fantastic!",
            },
            {
                name: "MAM2000W",
                description: "[Rating: 5/5] This course was made up of 4 modules: (1) Linear Algebra, (2) Advanced Calculus, (3) Real Analysis",
            },
            {
                name: "MAM3",
                description: "Indeed",
            },
        ]
    })
    interface ILearning {
        name: string,
        description: string,
        turned: boolean
    }

    const flip = (course: ILearning) => {
        const element = document.getElementById(course.name);
        
        if (element == null) {
            return
        }

        // Toggle element style for visibility when clicked
        if (element.classList.contains("scale-150"))
            element.classList.remove("scale-150", "z-10")
        else
            element.classList.add("scale-150", "z-10")

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
                            <div>{course.name}</div>
                        </button>
                    ))
                }
                {/* <button className="box flipper"></button>
                <div className="box flipper"></div>
                <div className="box"></div>
                <div className="box"></div> */}
            </div>

            <h3 className="heading">Outside University</h3>
            <div className="box-container">
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
                <div className="box"></div>
            </div>
        </div>
    )
}

export default Learning;