import React from "react";

import { SizeVariant } from "./widgets";
import styles from "../../styles/widgets/Select.module.css";

interface SelectOption {
    value: string;
    text: string;
}

interface SelectProps {
    options: SelectOption[];
    value?: string;
    variant?: SizeVariant;
    onChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = (props: SelectProps) => {
    let classNames = styles.select;
    if (props.variant) {
        classNames += ` ${styles[props.variant]}`;
    }

    return (
        <div className={classNames}>
            <select value={props.value} onChange={props.onChange}>
                {props.options.map((option, i) => (
                    <option key={i} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
