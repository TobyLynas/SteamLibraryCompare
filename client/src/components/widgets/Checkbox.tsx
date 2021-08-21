import React from "react";

import { WidgetProps } from "./widgets";
import styles from "../../styles/widgets/Checkbox.module.css";

interface CheckboxProps extends WidgetProps {
    text: string;
    isChecked?: boolean;
    onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
    let classNames = styles.checkboxContainer;
    if (props.variant) {
        classNames += ` ${styles[props.variant]}`;
    }

    return (
        <label className={classNames} style={props.style}>
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
