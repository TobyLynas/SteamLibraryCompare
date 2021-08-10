import styles from "../styles/index.module.css";
import LandingHeader from "../components/LandingHeader";
import Auth from "../components/Auth";
import React, { useState } from "react";

const HomePage = () => {
    const [display, setDisplay] = useState(true);
    const landingContainer = display ? styles.displayFlex : styles.displayNone;
    const authContainer = display ? styles.displayNone : styles.displayFlex;
    return (
        <div >
            <div className={landingContainer}>
                <LandingHeader 
                onClickHost={()=>setDisplay(!display)} 
                onClickJoin={()=>console.log("some Join Stuff")}/>
            </div>
            <div className={authContainer}>
                <Auth />
            </div>
        </div>
    );
};

export default HomePage;
