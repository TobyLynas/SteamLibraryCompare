import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/pageLayout.module.css";

const PageLayout = props => (
    <div className={styles.layout}>
        <Header />
        <div className={styles.content}>{props.children}</div>
        <Footer />
    </div>
);

export default PageLayout;
