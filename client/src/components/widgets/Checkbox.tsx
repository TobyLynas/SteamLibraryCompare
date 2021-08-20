import React from "react";
import styles from "../../styles/widgets/Checkbox.module.css";

interface CheckboxProps {
    text: string;
    isChecked?: boolean;
    onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    styling?: React.CSSProperties;
}

const Checkbox = (props: CheckboxProps) => {
    return (
        <label className={styles.checkboxContainer} style={props.styling}>
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
