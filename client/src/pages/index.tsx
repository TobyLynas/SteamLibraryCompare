import { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../UserContext";

import Button from "../components/widgets/Button";
import FAQ from "../components/FAQ";

import styles from "../styles/index.module.css";

const Index = () => {
    const user = useContext(UserContext);
    if (user) {
        // TODO: Figure out what to put here
        return (
            <div>
                Logged in with Steam ID:
                <br />
                <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                    {user.steamId}
                </span>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.rearBox}></div>
            <div className={styles.middleBox}>
                <div className={styles.headingText}>
                    Compare libraries with your freinds.
                </div>
                <div className={styles.bodyText}>
                    we could put text here?
                </div>
            </div>
            <div className={styles.frontBox}>
                <img className={styles.imageContainer} src="sits_new3x.png" onClick={() => console.log("Do Something")} />
                PLEASE ENSURE YOUR STEAM PROFILE IS PUBLIC
            </div>
        </div>
    );
};

export default Index;
