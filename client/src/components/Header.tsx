import React from "react";
import { Link } from "react-router-dom";

import styles from "../styles/Header.module.css";

const Header = () => (
    <div className={styles.header}>
        <Link to="/">
            <h1 className={styles.heading}>Steam Library</h1>
            <h2 className={styles.subHeading}>needaga.me</h2>
        </Link>
    </div>
);

export default Header;
