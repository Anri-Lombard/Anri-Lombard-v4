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
                        Hey there! When I'm not busy diving into the world of Machine Learning or studying Computer Science and Mathematical Statistics, I make sure to stay connected.
                    </p>
                    <p className="mb-5">
                        So, if you want to discuss a project, share insights, or just chat about coding and statistics, don't hesitate to reach out. Keep in mind that I might take a day or two to respond, as I'm often engaged in the delightful dance of coding and studying.
                    </p>
                    <p>
                        My school email address is{" "}
                        <strong>
                            <a href="mailto:lmbanr001@myuct.ac.za" className="text-blue-600 hover:text-blue-800 transition duration-300">
                                lmbanr001@myuct.ac.za
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
