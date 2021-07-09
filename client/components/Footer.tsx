import React from "react";
import Image from "next/image";
import styles from "../styles/footer.module.css";

const Footer = () => (
    <div className={styles.footer}>
        <div className={styles.links}>
            <p>Find us on GitHub:</p>
            <a
                style={{ marginTop: 5 }}
                target="_blank"
                href="https://github.com/TobyLynas/SteamLibaryCompare"
            >
                <Image
                    width="25px"
                    height="25px"
                    src="/github-icon.svg"
                    alt="Git Hub logo"
                />
            </a>
        </div>
        <div className={styles.disclaimer}>
            <p>
                This app is a community website and is not affiliated
                <br />
                with Valve or Steam.
            </p>
            <p>Fair use disclaimer.</p>
        </div>
    </div>
);

export default Footer;
