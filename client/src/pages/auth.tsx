import styles from "../styles/auth.module.css";
import Button from "../components/Button";

const Auth = () => (
    <div className={styles.main}>
        <div className={styles.topRow}>
            <Button
                text="Sign in through Steam"
                variant="large"
                onClick={() => console.log("Steam Auth Stuff")}
            />
            <div className={styles.or}>or</div>
            <div className={styles.profileUrl}>
                Enter Your Steam profile URL:
                <input
                    defaultValue="https://steamcommunity.com/profiles/..."
                    className={styles.input}
                ></input>
            </div>
        </div>
        <p className={styles.bottomRow}>
            Please ensure your{" "}
            <strong>
                game details is set to <em>public</em>
            </strong>{" "}
            so we can fetch your game library.
        </p>
    </div>
);

export default Auth;
