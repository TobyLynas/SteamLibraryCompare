import styles from "../styles/Textbox.module.css";

interface TextboxProps {
    placeholder: string;
}

const Textbox = (props: TextboxProps) => {
    return (
        <textarea className={styles.main} placeholder={props.placeholder}>

        </textarea>
    );
};

export default Textbox;