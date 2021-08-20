import TextInput from "../components/widgets/TextInput";
import Checkbox from "../components/widgets/Checkbox";
import Button from "../components/widgets/Button";

import styles from "../styles/hostSetup.module.css";

const hostSetup = () => {
    return (
        <div className={styles.main}>
            <div className={styles.title}>Host a Room</div>
            <div className={styles.grid}>
                <TextInput placeholder="Room Name" isPassword={false} />
                <Checkbox
                    styling={{ alignSelf: "start" }}
                    text="Only show games that everyone has"
                />
                <div className={styles.enableAuth}>
                    <div className={styles.authSpacing}>
                        <Checkbox text="Enable Authentication" />
                    </div>
                    <TextInput placeholder="Password" isPassword={true} />
                </div>
                <Button text="Create Room" variant="large" />
            </div>
        </div>
    );
};

export default hostSetup;
