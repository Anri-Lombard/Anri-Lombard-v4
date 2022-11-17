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
                <div className="contact">
                    I&aposm probabaly studying or reading most of the time, but if you feel adventurous, you can try to contact me at:
                    <div className="font-bold text-lg">
                        <a href="mailto:LMBANR001@myuct.ac.za">LMBANR001@myuct.ac.za</a>
                    </div>
                    OR
                    <div className="font-bold text-lg">
                    <a href="mailto:anri.m.lombard@gmail.com">anri.m.lombard@gmail.com</a>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Contact;