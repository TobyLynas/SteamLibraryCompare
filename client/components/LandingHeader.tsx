import styles from "../styles/landingHeader.module.css";
import Button from "../components/Button";

interface LandingHeaderProps {
    onClickHost: any;
    onClickJoin: any;
}

const hostRoom = () => {
    console.log("Host Function");
};
const joinRoom = () => {
    console.log("Join Function");
};

const LandingHeader = (props: LandingHeaderProps) => (
    <div className={styles.landingHeader}>
        <div className={styles.transparentBox}>
            <div className={styles.grandText}>What is this?</div>
            <div className={styles.subText}>placeholder</div>
            <div className={styles.highlightBox}>
                <div className={styles.gettingStarted}>Getting started</div>
                <br />
                <div className={styles.alignmentBox}>
                    <Button text="Host Room" onClick={props.onClickHost} />
                    <Button text="Join Room" onClick={props.onClickJoin} />
                </div>
            </div>
        </div>
    </div>
);

export default LandingHeader;
