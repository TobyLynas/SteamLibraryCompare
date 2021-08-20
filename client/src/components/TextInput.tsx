import styles from "../styles/TextInput.module.css";

interface TextInputProps {
    placeholder: string;
    isPassword: boolean;
}

const TextInput = (props: TextInputProps) => {
    return (
        <input 
        className={styles.main} 
        placeholder={props.placeholder} 
        type={props.isPassword?"password":"text"}
        />
    );
};

export default TextInput;