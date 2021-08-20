import styles from "../styles/Textbox.module.css";

interface TextboxProps {
    placeholder: string;
}

const Textbox = (props: TextboxProps) => {
    return (
        <input className={styles.main} placeholder={props.placeholder} />
    );
};

export default Textbox;