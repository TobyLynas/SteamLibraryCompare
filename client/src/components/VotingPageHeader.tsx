import styles from "../styles/VotingPageHeader.module.css";

type VotingHeaderProps = {
    foreArrow: string;
    aftArrow: string;
    title: string;
};

const VotingPageHeader = (props: VotingHeaderProps) => {
    return (
        <div className={styles.page}>
            <div className={styles.primaryContent}>
                {props.foreArrow} {"->"} {props.aftArrow}
                <h1 className={styles.title}>{props.title}</h1>
            </div>
            <div className={styles.secondaryContent}></div>
        </div>
    );
};

export default VotingPageHeader;
