import styles from "../styles/index.module.css";
import LandingHeader from "../components/LandingHeader";
import FEAuth from "../components/FEAuth";
import React, { useState } from "react";

const HomePage = () => {
    const [display, setDisplay] = useState(true);
    const landingContainer = display ? styles.displayBlock : styles.displayNone;
    const authContainer = display ? styles.displayNone : styles.displayBlock;
    return (
        <div >
            <div className={landingContainer}>
                <LandingHeader 
                onClickHost={()=>setDisplay(!display)} 
                onClickJoin={()=>console.log("some Join Stuff")}/>
            </div>
            <div className={authContainer}>
                <FEAuth />
            </div>
        </div>
    );
};

export default HomePage;
