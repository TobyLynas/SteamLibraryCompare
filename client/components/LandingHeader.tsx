import styles from "../styles/landingHeader.module.css";
import Button from "../components/Button";
const hostRoom = () => {
    console.log("Host Function");
};
const joinRoom = () => {
    console.log("Join Function");
};

const LandingHeader = () => (
    <div className={styles.landingHeader}>
        <div className={styles.imgBox}>
            <div className={styles.transparentBox}>
                <div className={styles.grandText}>What is this?</div>
                <div className={styles.subText}>placeholder</div>
            </div>
            <div className={styles.highlightBox}>
                <div className={styles.gettingStarted}>Getting started</div>
                <br />
                <div className={styles.alignmentBox}>
                    <Button text="Host Room" onClick={hostRoom} />
                    <Button text="Join Room" onClick={joinRoom} />
                </div>
            </div>
        </div>
    </div>
);

export default LandingHeader;
