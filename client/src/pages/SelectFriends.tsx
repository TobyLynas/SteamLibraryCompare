import styles from "../styles/SelectFriends.module.css";
import { useContext } from "react";
import VotingPageHeader from "../components/VotingPageHeader";
import UserContext from "../UserContext";

const SelectFriends = () => {
    const user = useContext(UserContext);
    if (user) {
   
        return (
            <div className={styles.page}>
                <VotingPageHeader
                    foreArrow="setup"
                    aftArrow="Others"
                    title="Choose Friends"
                />
                <div className={styles.container}>
                    <div className={styles.primaryContent}>
                        Select friends you want to compare libraries:
                    </div>
                    <div className={styles.secondaryContent}>
                        {user.steamId}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <VotingPageHeader
                foreArrow="setup"
                aftArrow="Others"
                title="Choose Friends"
            />
            <div className={styles.container}>
                <div className={styles.primaryContent}>
                    Select friends you want to compare libraries:
                </div>
                <div className={styles.secondaryContent}></div>
            </div>
        </div>
    );
};

export default SelectFriends;
