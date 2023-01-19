import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
}
