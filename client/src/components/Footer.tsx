import styles from "../styles/Footer.module.css";
import githubIcon from "../assets/github-icon.svg";

const Footer = () => (
    <div className={styles.footer}>
        <div className={styles.links}>
            <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/TobyLynas/SteamLibaryCompare"
                title="Find us on GitHub"
            >
                <img
                    src={githubIcon}
                    alt="GitHub logo"
                    width="36"
                    height="36"
                />
            </a>
        </div>
        <div className={styles.disclaimer}>
            <p>
                {process.env.REACT_APP_NAME} is a community website and is not
                affiliated with Valve or Steam.
            </p>
            <p className={styles.disclaimerCopyright}>
                Steam and the Steam logo are trademarks and/or registered
                trademarks of Valve Corporation in the U.S. and/or other
                countries.
            </p>
        </div>
    </div>
);

export default Footer;
