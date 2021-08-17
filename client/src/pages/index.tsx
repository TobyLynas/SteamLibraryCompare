import { Link } from "react-router-dom";

import Button from "../components/Button";
import styles from "../styles/index.module.css";
import FAQ from "../components/FAQ";

const Index = () => (
    <div className={styles.pageContainer}>
        <div className={styles.landingHeader}>
            <div className={styles.transparentBox}>
                <h1 className={styles.grandText}>What is this?</h1>
                <p className={styles.subText}>placeholder</p>
            <div className={styles.highlightBox}>
                <h2 className={styles.gettingStarted}>Getting started</h2>
                <div className={styles.alignmentBox}>
                    <Link to="/auth">
                        <Button text="Host Room" variant="large" />
                    </Link>
                    <Button text="Join Room" variant="large" />

                </div>
            </div>
        </div>
        <FAQ />
    </div>
);

export default Index;
