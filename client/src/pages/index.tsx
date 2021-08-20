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
            <div className={styles.landingHeader}>
                <div className={styles.transparentBox}>
                    <h1 className={styles.grandText}>What is this?</h1>
                    <p className={styles.subText}>placeholder</p>
                    <div className={styles.highlightBox}>
                        <h2 className={styles.gettingStarted}>
                            Getting started
                        </h2>
                        <div className={styles.alignmentBox}>
                            <Link to="/auth">
                                <Button text="Host Room" variant="large" />
                            </Link>
                            <Button text="Join Room" variant="large" />
                        </div>
                    </div>
                </div>
            </div>

            <FAQ />
        </div>
    );
};

export default Index;
