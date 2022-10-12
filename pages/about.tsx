import Image from 'next/image';
import AnriIMG from '../public/images/Anri.jpg';


function About() {
    const codeText = `
        class Anri() {
            Age
        }
    `;

    return (
        <div className="min-h-screen flex flex-col mx-10">
            <div className="page-intro">
                About
            </div>
            <div className="flex m-10 flex-row profile">
                <div className="w-6/12 profile-img">
                    <Image src={AnriIMG} alt="Profile Picture" />
                </div>
                <div className="w-6/12 flex flex-col">
                    <span className="profile-item-1">
                        I am a <b>Full Stack Developer</b>, nascent <b>Machine Learning Engineer</b>, and a <b>University Undergraduate Researcher</b>.
                    </span>
                    <span className="profile-item-2">
                        In 2022 I turned <b>20 years old</b> and am spending this year studying <b>Computer Science</b>
                        &nbsp;and <b>Mathematical Statistics</b> in university.
                    </span>
                    <span className="profile-item-1">
                        My favourite activities are <b>Studying</b>, <b>Programming</b>, <b>Reading</b>,&nbsp;
                        <b>Exercising</b>, and <b>Writing</b>.
                    </span>
                    <span className="profile-item-2">
                        My least favourite activities are <b>Cooking</b>, <b>Cleaning,</b> <b>Commuting</b> and <b>Drinking Coffee</b>.
                    </span>
                </div>
            </div>
            {/* <div>
                image pit for people to play around
            </div> */}


        </div>
    )
}

export default About