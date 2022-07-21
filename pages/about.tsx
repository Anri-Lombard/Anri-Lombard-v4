import styles from "../styles/About.module.css"

function About() {
    return (
        <div className="">
            <div className={styles.profile}>
                Box describing me in a fun way with animations
            </div>
            <div className={styles.codeBlock}>
                Code with cool animation making it fun to learn about me - perhaps interactive<br />
                Perhaps interactive and live coding
            </div>
        </div>
    )
}

export default About