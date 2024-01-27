import Head from 'next/head';

import learning from '../database/learning.json';

function Learning() {

    const flip = (course: { name: string; rating: string; description: string } | { name: string; rating: number; description: string }) => {

        const element = document.getElementById(course.name);

        if (element == null) {
            return
        }

        // Toggle course name and description on click
        if (element.innerHTML === course.description) {
            element.innerHTML = "<pre>" + course.rating + "\n" + course.name + "</pre>"
        } else
            element.innerHTML = course.description
    }

    // Custom comparator function for sorting
    const customSort = (a: any, b: any) => {
        const aName = a.name.charAt(3);
        const bName = b.name.charAt(3);

        if (aName > bName) {
            return -1;
        } else if (aName < bName) {
            return 1;
        } else {
            return 0;
        }
    };

    // Sort the 'university' array
    learning['university'].sort(customSort);

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
                                className="box transition duration-150 ease-out hover:ease-in hover:border-blue-500 hover:scale-105 hover:shadow-md"
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
                        learning['outside'].map((course, index) => (
                            <button
                                key={index}
                                id={course.name}
                                className="box transition duration-150 ease-out hover:ease-in hover:border-blue-500 hover:scale-105 hover:shadow-md"
                                onClick={() => flip(course)}
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