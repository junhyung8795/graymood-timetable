import Seo from "../components/Seo";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession, signOut, useSession } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import Calendar from "../components/Calendar";

export default function TimeTable({ session }) {
    const router = useRouter();
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    console.log(session);
    const handleLogout = (e) => {
        signOut({ callbackUrl: "/" });
    };
    return (
        <div>
            <Seo title="Notice" />
            <Calendar />
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    console.log(session);
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return { props: { session } };
}
