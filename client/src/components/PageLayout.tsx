import React from "react";

import styles from "../styles/PageLayout.module.css";

import Header from "./Header";
import Footer from "./Footer";

export interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout = (props: PageLayoutProps) => (
    <div className={styles.layout}>
        <Header />
        <div className={styles.content}>{props.children}</div>
        <Footer />
    </div>
);

export default PageLayout;
