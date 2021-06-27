import styles from "../styles/LandingHeader.module.css";
import Button from "../components/Button";
const hostRoom = () => {
    console.log("Host Function");
};
const joinRoom = () => {
    console.log("Join Function");
};

const LandingHeader = () => (
    <div className={styles.main}>
        <div className={styles.heading}>
            <div>Getting started</div>
            <br />
            <div className={styles.alignmentBox}>
                <Button text="Host Room" runFunction={hostRoom} />
                <Button text="Join Room" runFunction={joinRoom} />
            </div>
        </div>
    </div>
);

export default LandingHeader;
