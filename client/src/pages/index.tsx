import { Link } from "react-router-dom";

import Button from "../components/Button";
import styles from "../styles/index.module.css";

const Index = () => (
    <div>
    <div className={styles.landingHeader}>
        <div className={styles.transparentBox}>
            <h1 className={styles.grandText}>What is this?</h1>
            <p className={styles.subText}>placeholder</p>

            <div className={styles.highlightBox}>
                <h2 className={styles.gettingStarted}>Getting started</h2>
                <div className={styles.alignmentBox}>
                    <Link to="/auth">
                        <Button text="Host Room" />
                    </Link>
                    <Button text="Join Room" />
                </div>
            </div>
        </div>
    </div>
        <div className={styles.FAQBox}>
            Hello
        </div>
    </div>
);

export default Index;
