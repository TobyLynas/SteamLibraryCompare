import styles from "../styles/Footer.module.css";
import githubIcon from "../assets/github-icon.svg";

const Footer = () => (
    <div className={styles.footer}>
        <div className={styles.links}>
            <p>Find us on GitHub:</p>
            <a
                style={{ marginTop: 5 }}
                target="_blank"
                rel="noreferrer"
                href="https://github.com/TobyLynas/SteamLibaryCompare"
            >
                <img
                    src={githubIcon}
                    alt="GitHub logo"
                    width="25"
                    height="25"
                />
            </a>
        </div>
        <div className={styles.disclaimer}>
            <p>
                This app is a community website and is not affiliated with Valve
                or Steam.
            </p>
            <p>Fair use disclaimer.</p>
        </div>
    </div>
);

export default Footer;
