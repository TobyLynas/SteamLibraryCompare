import styles from "../styles/FriendBar.module.css";
import Checkbox from "./widgets/Checkbox";
import {useState} from "react"
export interface FriendBarProps {
    displayName: string;
}

const FriendBar = (props: FriendBarProps) => {
    const [barState, setBarState] = useState(false);
    return (
        <button onClick={() => setBarState(!barState)} className={styles.component}> {props.displayName} <Checkbox text="" isChecked={barState}/> </button>
    );
};

export default FriendBar;
