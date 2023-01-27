import Seo from "../components/Seo";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession, signOut, useSession } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import Calendar from "../components/Calendar";
import Event from "../db/schema/event";

export default function TimeTable({ session, events }) {
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
            <Calendar props={events} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    console.log(session);
    // const itemArray = await Item.find({});
    const eventArray = await Event.find({});
    const events = eventArray.map((doc) => {
        const item = doc.toObject();
        item._id = item._id.toString();
        return item;
    });
    console.log(events);
    // const items = itemArray.map((doc) => {
    //     const item = doc.toObject();
    //     item._id = item._id.toString();
    //     return item;
    // });
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return { props: { session, events } };
}
