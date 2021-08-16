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
            {/* // <div className={styles.contentContainer}> */}
            <div
                className={
                    FAQState
                        ? styles.contentContainer
                        : styles.contentContainerHide
                }
            >
                <div className={styles.header}>
                    <strong>
                        Why do I need to sign into my Steam Account?
                    </strong>
                </div>
                If you prefer to not sign in, you can alternatively enter your
                steam profile URL. We need your Steam ID in order to view your
                game library and
                <div className={styles.header}>
                    <strong>Where can I send suggestions?</strong>
                </div>
                Somewhere else bro
            </div>
        </div>
    );
};

export default FAQ;
