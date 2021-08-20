import styles from "../styles/hostSetup.module.css";
import TextInput from "../components/TextInput";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
const hostSetup = () => {
    return (
        <div className={styles.main}>
            <div className={styles.title}>Host a Room</div>
            <div className={styles.grid}>
                <TextInput placeholder="Room Name" isPassword={false}/>
                <Checkbox text="Only show games that everyone has" />
                <div className={styles.enableAuth}>
                    <div className={styles.authSpacing}>
                        <Checkbox text="Enable Authentication" />
                    </div>
                    <TextInput placeholder="Password" isPassword={true}/>
                </div>
                <Button text="Create Room" variant="large" />
            </div>
        </div>
    );
};

export default hostSetup;
