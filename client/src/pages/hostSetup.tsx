import styles from "../styles/hostSetup.module.css";
import Textbox from "../components/Textbox";

const hostSetup = () => {
    return(
        <div className={styles.main}>
            <h2>Host a Room</h2>
            <Textbox placeholder="Hey there"/>
        </div>
    );
};

export default hostSetup;