import React from "react";
import styles from "../styles/Checkbox.module.css";

interface CheckboxProps {
    text: string;
    isChecked?: boolean;
    onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
    return (
        <label className={styles.checkboxContainer}>
            <input
                type="checkbox"
                checked={props.isChecked}
                className={styles.checkbox}
                onChange={props.onChange}
            ></input>
            {props.text}
        </label>
    );
};

export default Checkbox;
