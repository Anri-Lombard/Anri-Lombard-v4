import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGithub,
    faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import {
    faCircleHalfStroke
} from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 opacity-50">
            <div className="container flex flex-wrap justify-center items-center mx-auto cursor-default">
                
                <div className="block w-full" id="navbar-default">
                    <div className="sm:flex sm:flex-row sm:space-x-96 p-7">
                        <div className="flex self-center">
                            &copy; 2022 Anri Lombard
                        </div>
                        {/* <div>
                            Page links
                        </div> */}
                        <div className="lg:flex space-x-5 hidden">
                            <span className="cursor-pointer hover:opacity-40">
                                <Link href="https://github.com/Anri-Lombard">
                                    <FontAwesomeIcon icon={faGithub} />
                                </Link>
                            </span>
                            <span>
                                &#x2022;
                            </span>
                            <span className="cursor-pointer hover:opacity-40">
                                <Link href="https://www.linkedin.com/in/anri-lombard-ab37ab201/">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </Link>
                            </span>
                            {/* <span>
                                &#x2022;
                            </span>
                            <span className="cursor-pointer hover:opacity-40">
                                <Link href="https://www.linkedin.com/in/anri-lombard-ab37ab201/">
                                    <FontAwesomeIcon icon={faCircleHalfStroke} />
                                </Link>
                            </span> */}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Footer;