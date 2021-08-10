import LandingHeader from "../components/LandingHeader";
import Auth from "../components/Auth";
import React, { useState } from "react";

const HomePage = () => {
    const [display, setDisplay] = useState(true);
    if (display == true) {
        return (
            <LandingHeader
                onClickHost={() => setDisplay(!display)}
                onClickJoin={() => console.log("some Join Stuff")}
            />
        );
    } else {
        return <Auth />;
    }
};

export default HomePage;
