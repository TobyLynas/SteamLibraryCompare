import React from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";
import styles from "../styles/pageLayout.module.css";

const PageLayout = props => (
    <div className={styles.layout}>
        <TopNav />
        <div className={styles.content}>{props.children}</div>
        <Footer />
    </div>
);

export default PageLayout;
