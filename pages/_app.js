import { SessionProvider } from "next-auth/react";
import "../styles/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}
