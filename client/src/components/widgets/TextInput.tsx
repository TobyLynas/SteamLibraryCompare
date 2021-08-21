import { WidgetProps } from "./widgets";
import styles from "../../styles/widgets/TextInput.module.css";

interface TextInputProps extends WidgetProps {
    placeholder?: string;
    isPassword?: boolean;
}

const TextInput = (props: TextInputProps) => {
    let classNames = styles.textInput;
    if (props.variant) {
        classNames += ` ${styles[props.variant]}`;
    }

    return (
        <input
            className={classNames}
            placeholder={props.placeholder}
            type={props.isPassword ? "password" : "text"}
        />
    );
};

export default TextInput;
