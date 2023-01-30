import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return (
        <SessionProvider session={pageProps.session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
}
