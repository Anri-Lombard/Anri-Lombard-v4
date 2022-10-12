import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGithub,
    faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import {
    faCircleHalfStroke
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';
import { useRouter } from "next/router";

function Navbar() {
    const router = useRouter();

    const handleScroll = () => {
        if (window.scrollY < 30) {
            document.getElementById("navbar").classList.add("p-7")
            document.getElementById("navbar").classList.remove("p-2")
         } else if (window.scrollY >= 30) {
            document.getElementById("navbar").classList.add("p-2")
            document.getElementById("navbar").classList.remove("p-7")
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 sticky top-0 left-0 right-0 z-10">
            <div id="navbar" className="container flex flex-wrap justify-between items-center mx-auto p-7">
                <div className="cursor-pointer">
                    <Link href="/">
                        <span className="flex items-center self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Anri Lombard
                        </span>
                    </Link>
                </div>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li className={router.pathname === "/about" ? "navbar-item active" : "navbar-item"}>
                            <Link href="/about">About</Link>
                        </li>
                        <li className={router.pathname === "/learning" ? "navbar-item active" : "navbar-item"}>
                            <Link href="/learning">Learning</Link>
                        </li>
                        <li className={router.pathname === "/projects" ? "navbar-item active" : "navbar-item"}>
                            <Link href="/projects">Projects</Link>
                        </li>
                        <li className={router.pathname === "/contact" ? "navbar-item active" : "navbar-item"}>
                            <Link href="/contact">Contact</Link>
                        </li>
                        <li className={router.pathname === "/blog" ? "navbar-item active" : "navbar-item"}>
                            <Link href="https://anri-lombard.github.io/">Blog</Link>
                        </li>
                        <li className="cursor-pointer hover:opacity-50">
                            <Link href="https://github.com/Anri-Lombard">
                                <FontAwesomeIcon icon={faGithub} />
                            </Link>
                        </li>
                        <li className="cursor-pointer hover:opacity-50">
                            <Link href="https://www.linkedin.com/in/anri-lombard-ab37ab201/">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </Link>
                        </li>
                        <li className="cursor-pointer hover:opacity-50">
                            <Link href="https://www.linkedin.com/in/anri-lombard-ab37ab201/">
                                <FontAwesomeIcon icon={faCircleHalfStroke} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar