import styles from "../styles/LandingHeader.module.css";
import Button from "../components/Button";

interface LandingHeaderProps {
    onClickHost: () => void;
    onClickJoin: () => void;
}
const LandingHeader = (props: LandingHeaderProps) => (
    <div className={styles.landingHeader}>
        <div className={styles.transparentBox}>
            <h1 className={styles.grandText}>What is this?</h1>
            <p className={styles.subText}>placeholder</p>

            <div className={styles.highlightBox}>
                <h2 className={styles.gettingStarted}>Getting started</h2>
                <div className={styles.alignmentBox}>
                    <Button text="Host Room" onClick={props.onClickHost} />
                    <Button text="Join Room" onClick={props.onClickJoin} />
                </div>
            </div>
        </div>
    </div>
);

export default LandingHeader;
