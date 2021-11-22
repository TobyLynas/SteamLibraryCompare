import React, { useState } from "react";
import styles from "../styles/GameTally.module.css";
import monster1Icon from "../assets/monster1.svg";
import monster2Icon from "../assets/monster2.svg";
import monster3Icon from "../assets/monster3.svg";

interface Game {
    name: string;
    image: number;
}

interface GameTallyProps {
    votes: string[];
    game: Game;
}

interface VoteTallyProps {
    vote: string;
    index: number;
}

interface OverflowVotesProps {
    votes: string[];
}

interface PopupProps {
    text: string;
    top?: number;
}

interface GameRatingProps {
    rating: number;
}

const Popup = (props: PopupProps) => (
    <>
        <div
            className={styles.popup}
            style={{ top: props.top ? `${props.top}px` : "-5px" }}
        >
            {props.text}
        </div>
        <div
            className={styles.popupArrow}
            style={{ top: props.top ? `${props.top + 25}px` : "20px" }}
        />
    </>
);

const Crown = () => (
    <div className={styles.crownContainer}>
        <div className={styles.crownPointContainer}>
            <div className={styles.crownPoint} />
            <div className={styles.crownPoint} />
            <div className={styles.crownPoint} />
        </div>
        <div className={styles.crownBase} />
    </div>
);

const OverflowVotes = (props: OverflowVotesProps) => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className={styles.circlesContainer}>
            {showPopup && (
                <Popup
                    top={-22}
                    text={`+ ${props.votes.length} other${
                        props.votes.length === 1 ? "" : "s"
                    }
                `}
                />
            )}
            <div
                onMouseOver={() => setShowPopup(true)}
                onMouseOut={() => setShowPopup(false)}
            >
                <div className={styles.bounce} />
                <div className={styles.bounce2} />
                <div className={styles.bounce3} />
            </div>
        </div>
    );
};

const GameRating = (props: GameRatingProps) => (
    <>
        <div className={styles.gameRating}>
            <>
                {props.rating === 1 && <Crown />}
                <div className={styles.outerRatingCircle} />
                <h1 className={styles.ratingText}>{props.rating}</h1>
                <div className={styles.innerRatingCircle} />
            </>
        </div>
    </>
);

const VoteTally = (props: VoteTallyProps) => {
    const [showPopup, setShowPopup] = useState(false);
    const iconArray = [monster1Icon, monster2Icon, monster3Icon];

    return (
        <div className={styles.voteTally}>
            {showPopup && <Popup text={props.vote} />}
            <div
                className={styles.bounceSquare}
                onMouseOver={() => setShowPopup(true)}
                onMouseOut={() => setShowPopup(false)}
            >
                <img
                    src={iconArray[props.index]}
                    alt="display icon"
                    width="36"
                    height="36"
                />
            </div>
        </div>
    );
};

const GameTally = (props: GameTallyProps) => {
    const displayedVotes = props.votes.slice(0, 3);
    const overflowVotes = props.votes.slice(3, props.votes.length);

    return (
        <div className={styles.columnFlex}>
            <div className={styles.rowFlex}>
                <div className={styles.votesDisplay}>
                    {props.votes.length > 3 && (
                        <OverflowVotes votes={overflowVotes} />
                    )}
                    {displayedVotes.map((friend, i) => {
                        return <VoteTally vote={friend} index={i} />;
                    })}
                </div>
                <div className={styles.gamePortrait}>
                    <GameRating rating={1} />
                </div>
            </div>
            <div className={styles.endFlex}>
                <div className={styles.gameTextContainer}>
                    <div className={styles.gameText} title={props.game.name}>
                        {props.game.name}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameTally;
