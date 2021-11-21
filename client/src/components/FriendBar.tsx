import styles from "../styles/FriendBar.module.css";
import Checkbox from "./widgets/Checkbox";
import {useState} from "react"
export interface FriendBarProps {
    displayName: string;
}

const FriendBar = (props: FriendBarProps) => {
    const [barState, setBarState] = useState(false);
    return (
        <button onClick={() => setBarState(!barState)} className={barState===true?styles.unselected:styles.selected}>{props.displayName} <Checkbox text="" isChecked={barState} onChange={()=>{}} style={ barState?{backgroundColor: "#529C6B", border: "none"}:{backgroundColor:'#2A475E', border: "none"}} /> </button>
    );
};

export default FriendBar;
