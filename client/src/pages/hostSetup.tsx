import styles from "../styles/hostSetup.module.css";
import passwordStyle from "../styles/Textbox.module.css";
import Textbox from "../components/Textbox";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
const hostSetup = () => {
    return (
        <div className={styles.main}>
            <div className={styles.title}>Host a Room</div>
            <div className={styles.grid}>
                <Textbox placeholder="Room Name" />
                <Checkbox text="Only show games that everyone has" />
                <div className={styles.enableAuth}>
                    <div className={styles.authSpacing}>
                        <Checkbox text="Enable Authentication" />
                    </div>
                    <input className={passwordStyle.main} type="password" />
                </div>
                <Button text="Create Room" variant="large" />
            </div>
        </div>
    );
};

export default hostSetup;
