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
                        I am a <b>Full Stack Developer</b>, nascent <b>Machine Learning Engineer</b>,&nbsp;
                        <b>University Research Student</b>, hobbyist <b>Blockchain Developer</b>, and avid&nbsp;
                        <b>Open Source Contributor</b>
                    </span>
                    <span className="profile-item-2">
                        In 2022 I turned <b>20 years old</b> and spend this year studying <b>Computer Science</b>
                        &nbsp;and <b>Mathematical Statistics</b> in university
                    </span>
                    <span className="profile-item-1">
                        My favourite activities are <b>Studying</b>, <b>Programming</b>, <b>Reading</b>,&nbsp;
                        <b>Exercising</b>, <b>Writing</b>, <b>Taking Friends On Memorable Adventures</b> and, most&nbsp;
                        recently, <b>Watching Anime With Friends</b>
                    </span>
                    <span className="profile-item-2">
                        My least favourite activities are <b>Paying For Gas</b>, <b>Writing Abritrary University Exams</b>,
                        <b>Watching Anime Alone</b>, <b>Doing Dishes</b>, <b>Doing Laundry</b>, and&nbsp;
                        <b>Commuting</b>
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