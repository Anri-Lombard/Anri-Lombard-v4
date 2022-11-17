import Image from 'next/image';
import AnriIMG from '../public/images/Anri.jpg';
import Head from 'next/head';


function About() {
    const codeText = `
        class Anri() {
            Age
        }
    `;

    return (
        <>
            <Head>
                <title>Anri Lombard - About</title>
                <meta name="description" content="Personal information and introduction" />
            </Head>
            <div className="min-h-screen flex flex-col mx-10">
                <div className="page-intro">
                    About
                </div>
                <div className="xl:hidden pt-10 flex-auto w-1/2 lg:w-1/3 border-solid border-2 border-white rounded-sm xl:w-full profile-img self-center">
                    <Image src={AnriIMG} alt="Profile Picture" />
                </div>
                <div className="flex m-10 flex-col xl:flex-row profile">
                    <div className="hidden xl:block flex-auto w-72 border-solid border-2 border-white rounded-sm xl:w-full profile-img self-center">
                        <Image src={AnriIMG} alt="Profile Picture" />
                    </div>
                    <div className="flex-auto flex flex-col">
                        <span className="profile-item-1">
                            I am a <b>Full Stack Developer</b>, nascent <b>Machine Learning Engineer</b>, and an <b>University Undergraduate Researcher</b>.
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
                            My least favourite activities are <b>Cooking</b>, <b>Cleaning</b>, <b>Comparing Computer CPUs</b>, and <b>Commuting</b>.
                        </span>
                    </div>
                </div>
                {/* <div>
                    image pit for people to play around
                </div> */}


            </div>
        </>
    )
}

export default About