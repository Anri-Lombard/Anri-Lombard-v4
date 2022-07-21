import Link from 'next/link';

function Navbar() {
    return (
        <div className="navbar flex flex-row">
            <div className="basis-1/4">
                <Link href="/">
                    Anri Lombard
                </Link>
            </div>
            {/* <div className="basis-1/4"></div> */}
            <div className="basis-3/16">
                <Link href="/about">
                    About
                </Link>
            </div>
            <div className="basis-3/16">
                <Link href="/learning">
                    Learning
                </Link>
            </div>
            <div className="basis-3/16">
                <Link href="/projects">
                    Projects
                </Link>
            </div>
            <div className="basis-3/16">
                <Link href="https://anri-lombard.github.io/">
                    Blog
                </Link>
            </div>
        </div>
    )
}

export default Navbar