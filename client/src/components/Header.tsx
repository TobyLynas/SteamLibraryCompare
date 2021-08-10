import React from "react";
import { Link } from "react-router-dom";

import styles from "../styles/Header.module.css";

const Header = () => (
    <div className={styles.header}>
        <Link to="/">
            <h1 className={styles.heading}>Steam Library</h1>
        </Link>
    </div>
);

export default Header;
