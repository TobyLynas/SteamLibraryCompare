import styles from "../styles/FAQ.module.css";
import chevron from "../assets/chevron-down.svg";

import React, { useState } from "react";

const FAQ = () => {
    const [FAQState, setState] = useState(false);
    return (
        <div className={styles.FAQBox}>
            Have more questions?
            <img
                src={chevron}
                alt="Downwards Chevron"
                className={FAQState?styles.chevronRotate:styles.chevron}
                onClick={() => setState(!FAQState)}
            />
            <div
                className={
                    FAQState
                        ? styles.contentContainer
                        : styles.contentContainerHide
                }
            >
                <p className={styles.header}>
                    <strong>
                        Why do I need to sign into my Steam Account?
                    </strong>
                </p>
                If you prefer to not sign in, you can alternatively enter your
                steam profile URL. We need your Steam ID in order to view your
                game library and
                <p className={styles.header}>
                    <strong>Where can I send suggestions?</strong>
                </p>
                Somewhere else bro
            </div>
        </div>
    );
};

export default FAQ;
