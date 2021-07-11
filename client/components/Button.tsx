/* Reusable button component, use the text props to set the text for the button
and the runFunction prop should be a function with what the button should do*/

import styles from "/styles/button.module.css";

interface ButtonProps {
    text: string;
    onClick: any;
}

const Button = (props: ButtonProps) => {
    return (
        <div className={styles.container}>
            <button className={styles.box} onClick={() => props.onClick()}>
                {props.text}
            </button>
        </div>
    );
};
export default Button;
