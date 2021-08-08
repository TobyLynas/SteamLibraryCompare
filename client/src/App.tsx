import React from "react";

import "./styles/global.css";
import styles from "./styles/App.module.css";

import LandingHeader from "./components/LandingHeader";
import PageLayout from "./components/PageLayout";

function App() {
    return (
        <PageLayout>
            <div className={styles.headerContainer}>
                <LandingHeader />
            </div>
        </PageLayout>
    );
}

export default App;
