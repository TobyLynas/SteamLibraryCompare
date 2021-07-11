import React from "react";
import "../styles/global.css";
import { AppProps } from "next/app";
import PageLayout from "../components/PageLayout";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <PageLayout>
            <Component {...pageProps} />
        </PageLayout>
    );
}

export default MyApp;
