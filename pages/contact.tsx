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
                <div className="contact max-w-2xl">
                    Hey there! I may spend most of my days exploring the red planet and searching for unicorns, but I still make time to check my emails. 
                    Just in case, you know, a unicorn sends me a message. So if you need to get in touch, don&apos;t hesitate to send an email my way, just don&apos;t
                    be surprised if I take one, two (or three) days to respond, these unicorns sure hide well! My email address is {" "}
                    <strong><a href="mailto:anri.m.lombard@gmail.com">anri.m.lombard@gmail.com</a></strong>.
                </div>
                
            </div>
        </>
    )
}

export default Contact;