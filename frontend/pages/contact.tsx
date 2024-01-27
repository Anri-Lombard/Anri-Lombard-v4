import Head from 'next/head';

function Contact() {
    return (
        <>
            <Head>
                <title>Anri Lombard - Contact</title>
                <meta name="description" content="Contact information" />
            </Head>
            <div className="min-h-screen flex flex-col mx-10">
                <div className="page-intro">
                    Contact
                </div>
                <div className="contact max-w-2xl mt-10">
                    <p className="mb-5">
                        Hey there! When I&lsquo;m not doing Machine Learning or studying Computer Science and Mathematical Statistics, I make sure to stay connected.
                    </p>
                    <p className="mb-5">
                        So, if you want to discuss a project, share insights, or just chat about coding and statistics, don&lsquo;t hesitate to reach out. Keep in mind that I might take some days to respond.
                    </p>
                    <p>
                         My personal email address is{" "}
                        <strong>
                            <a href="mailto:anri.m.lombard@gmail.com" className="text-blue-600 hover:text-blue-800 transition duration-300">
                                anri.m.lombard@gmail.com
                            </a>
                        </strong>
                        .
                    </p>
                </div>
            </div>
        </>
    );
}

export default Contact;
