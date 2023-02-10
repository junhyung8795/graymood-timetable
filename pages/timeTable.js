import Seo from "../components/Seo";
import { useState } from "react";
import { useRouter } from "next/router";
import { getSession, signOut, useSession } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import Calendar from "../components/Calendar";
import Event from "../db/schema/event";

export default function TimeTable({ session, events }) {
    const router = useRouter();

    return (
        <div>
            <Seo title="Timetable" />
            <Calendar props={events} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const eventArray = await Event.find({});
    const events = eventArray.map((doc) => {
        const item = doc.toObject();
        item._id = item._id.toString();
        return item;
    });
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
