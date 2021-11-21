import styles from "../styles/SelectFriends.module.css";
import { useContext, useEffect, useState } from "react";
import VotingPageHeader from "../components/VotingPageHeader";
import UserContext from "../UserContext";
import Steam, { User } from "../lib/steam";
import FriendBar from "../components/FriendBar";

const SelectFriends = () => {
    const user = useContext(UserContext);
    const [friendsList, setFriendsList] = useState<User[]>();

    useEffect(() => {
        if (user) {
            const steam = new Steam(user.token);

            const storeFriendsList = async () => {
                const currentUser = await steam.getUserById(user.steamId);
                const currentUserFriendList: User[] =
                    await currentUser.fetchFriendsList();
                setFriendsList(currentUserFriendList.map(x => x));
            };

            storeFriendsList();
        }
    }, []);

    if (user) {
        // Create Steam instance
        return (
            <div className={styles.page}>
                <VotingPageHeader
                    foreArrow="setup"
                    aftArrow="Others"
                    title="Choose Friends"
                />
                <div className={styles.container}>
                    {friendsList && (
                        <div className={styles.primaryContent}>
                                <div className={styles.text}>Select friends you want to compare libraries:</div>
                            {friendsList.map(x => (
                                <FriendBar displayName={x.displayName} />
                            ))}
                        </div>
                    )}
                    <div className={styles.secondaryContent}></div>
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
