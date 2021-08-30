import { WidgetProps } from "./widgets";
import styles from "../../styles/widgets/TextInput.module.css";

interface TextInputProps extends WidgetProps {
    label?: string;
    placeholder?: string;
    isPassword?: boolean;
}

const TextInput = (props: TextInputProps) => {
    let classNames = styles.textInput;
    if (props.variant) {
        classNames += ` ${styles[props.variant]}`;
    }

    return (
        <label className={classNames} style={props.style}>
            {props.label && (
                <span className={styles.textInputLabel}>{props.label}</span>
            )}
            <input
                placeholder={props.placeholder}
                type={props.isPassword ? "password" : "text"}
            />
        </label>
    );
};

export default TextInput;
