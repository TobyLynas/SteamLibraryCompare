import styles from "../styles/FAQ.module.css";
import chevron from "../assets/chevron-down.svg";

import React, { useState } from "react";

const FAQList = () => {
    const [FAQState, setState] = useState(false);
    return (
        <div className={styles.FAQBox}>
            Have more questions?
            <img
                src={chevron}
                alt="Downwards Chevron"
                className={FAQState ? styles.chevronRotate : styles.chevron}
                onClick={() => setState(!FAQState)}
            />
            <div
                className={
                    FAQState
                        ? styles.contentContainer
                        : styles.contentContainerHide
                }
            >   
                <FAQItem heading="Title Heading"  entry="This is where a string goes"/>
                <FAQItem heading="A second title" entry="what do you want to out here guys?" />
            </div>
        </div>
    );
};

const FAQItem = ( props : { heading: string; entry: string; }) => {
    return (
        <p>
            <h2 className={styles.header}>
                {props.heading}
            </h2>
                {props.entry}
        </p>
    );
};

export default FAQList;
