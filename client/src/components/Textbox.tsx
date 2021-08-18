import styles from "../styles/Textbox.module.css";

interface TexboxProps {
    placeholder: string;
}

const Textbox = (props: TexboxProps) => {
    return (
        <textarea className={styles.main} placeholder={props.placeholder}>

        </textarea>
    );
};

export default Textbox;