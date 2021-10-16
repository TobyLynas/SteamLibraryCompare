import styles from "../styles/SelectFriends.module.css";
import VotingPageHeader from "../components/VotingPageHeader";
const SelectFriends = () => {
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
