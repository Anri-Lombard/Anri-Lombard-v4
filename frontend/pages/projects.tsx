import { useEffect, useRef } from 'react';

import Head from 'next/head';

import anime from 'animejs';

function Projects() {

    const funRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // Function to move the bubble away from the mouse pointer
        const avoidMouse = (event) => {
            if (funRef.current && containerRef.current) {
                const bubble = funRef.current;

                // Get the mouse position relative to the page
                const mouseX = event.pageX;
                const mouseY = event.pageY;

                // Get the position and dimensions of the bubble
                const bubbleRect = bubble.getBoundingClientRect();
                const bubbleX = bubbleRect.left + window.scrollX + bubbleRect.width / 2;
                const bubbleY = bubbleRect.top + window.scrollY + bubbleRect.height / 2;

                // Calculate the distance from the center of the bubble to the mouse
                const distanceX = mouseX - bubbleX;
                const distanceY = mouseY - bubbleY;


                // Determine the new position, with a max distance constraint
                const maxDistance = 200; // Increased max distance to move the bubble
                const avoidanceFactor = 20; // Increased for more "avoidance"
                let translateX = (distanceX > 0 ? -1 : 1) * maxDistance;
                let translateY = (distanceY > 0 ? -1 : 1) * maxDistance;

                // Apply the transformation with anime.js
                anime({
                    targets: bubble,
                    translateX: translateX,
                    translateY: translateY,
                    duration: 200, // Reduced duration for faster movement
                    easing: 'easeOutQuad',
                });
            }
        };

        // Add mouse move event listener to the container
        document.addEventListener('mousemove', avoidMouse);

        // Cleanup event listener
        return () => {
            document.removeEventListener('mousemove', avoidMouse);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Anri Lombard - Fun</title>
                <meta name="description" content="Built projects and open source contributions" />
            </Head>
            <div className="min-h-screen flex flex-col mx-10" ref={containerRef}>
                <div className="page-intro m-auto"  ref={funRef}>
                    Fun
                </div>

                <div className="box-container md:m-10 mt-10 grid md:grid-cols-2 gap-4">

                    <p>ML and DS projects</p>
                    
                </div>
            </div>
        </>
    )
}

export default Projects;
