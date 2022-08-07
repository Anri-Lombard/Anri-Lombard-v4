import { useState } from 'react';

function Learning() {
    const [learning, setLearning] = useState({
        "university": [
            {
                name: "MAM1",
                description: "Indeed",
                turned: false
            },
            {
                name: "MAM2",
                description: "Indeed",
                turned: false
            },
            {
                name: "MAM3",
                description: "Indeed",
                turned: false
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

        // setLearning(!course.turned)

        course.turned = !course.turned;
        
        element.classList.add("flip");
        setTimeout(() => {
            element.classList.remove("flip");
        }, 500)
        
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
                            className="box"
                            onClick={() => flip(course)}
                        >{course.turned ? course.description : course.name}</button>
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