import React from "react";
import PageLayout from "../components/PageLayout";

function MyApp({ Component, pageProps }) {
    return (
        <PageLayout>
            <style jsx global>{`
                body {
                    margin: 0;
                    font-family: inter, Sans-serif;
                }
                p {
                    margin: 0;
                }
            `}</style>
            <Component {...pageProps} />
        </PageLayout>
    );
}

export default MyApp;
