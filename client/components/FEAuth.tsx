import styles from "../styles/FEAuth.module.css";
import Button from "../components/Button";

const FEAuth = () => {
    return (
        <div className={styles.main}>
            <div className={styles.topRow}>
                <Button
                    className={styles.button}
                    text="Sign in through Steam"
                    onClick={() => console.log("Steam Auth Stuff")}
                />
                <div className={styles.or}>or</div>
                <div className={styles.profileUrl}>
                    Enter Your Steam profile URL:
                    <input
                        value="https://steamcommunity.com/profiles/..."
                        className={styles.input}
                    ></input>
                </div>
            </div>
            <div className={styles.bottomRow}>
                Please ensure your <b>game details is set to <i >public</i></b> so we can fetch
                your game library.
            </div>
        </div>
    );
};

export default FEAuth;
