import { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../UserContext";

import Button from "../components/widgets/Button";
import FAQ from "../components/FAQ";

import styles from "../styles/index.module.css";

const Index = () => {
    const user = useContext(UserContext);
    if (user) {
        // TODO: Figure out what to put here
        return (
            <div>
                Logged in with Steam ID:
                <br />
                <span style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                    {user.steamId}
                </span>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.rearBox}></div>
            <div className={styles.middleBox}>
                <h2 className={styles.tagline}>
                    Compare libraries with your friends.
                </h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer ac blandit elit. Sed iaculis eu ligula ut dictum.
                    Donec eget nisl in tortor viverra vestibulum eget non neque.
                    Cras a tellus mauris. Sed ac ultrices enim. Class aptent
                    taciti sociosqu ad litora torquent per conubia nostra, per
                    inceptos himenaeos. Phasellus eleifend, nisl at varius
                    accumsan, orci enim viverra dui, vel sagittis quam eros in
                    erat. Mauris pharetra condimentum lorem sed lacinia.
                    Pellentesque id massa consequat, efficitur elit ac, varius
                    velit. Vivamus facilisis erat eget consequat tristique.
                    Integer sed nisl maximus, eleifend lectus non, consectetur
                    velit.
                </p>
            </div>
            <div className={styles.frontBox}>
                <Link to="/auth">
                    <img
                        src="sits_new3X.png"
                        srcSet="sits_new2X.png"
                        alt="Sign in with Steam button"
                    />
                </Link>
                <p className={styles.text}>
                    PLEASE ENSURE YOUR STEAM PROFILE IS PUBLIC
                </p>
            </div>
        </div>
    );
};

export default Index;
