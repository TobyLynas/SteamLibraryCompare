import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/pageLayout.module.css";

const PageLayout = ({ children }: { children: React.ReactNode }) => (
    <div className={styles.layout}>
        <Header />
        <div className={styles.content}>{children}</div>
        <Footer />
    </div>
);

export default PageLayout;
