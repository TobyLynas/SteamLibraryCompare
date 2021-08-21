import React from "react";

import { SizeVariant } from "./widgets";
import styles from "../../styles/widgets/Button.module.css";

interface ButtonProps {
    text: string;
    variant?: SizeVariant;
    disabled?: boolean;
    onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: ButtonProps) => {
    let classNames = styles.button;
    if (props.variant) {
        classNames += ` ${styles[props.variant]}`;
    }

    return (
        <button
            className={classNames}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
};

export default Button;
