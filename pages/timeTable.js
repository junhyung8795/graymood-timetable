import Seo from "../components/Seo";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import Calendar from "../components/Calendar";
import Event from "../db/schema/event";

export default function TimeTable({ events }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    useEffect(() => {
        if (!session) {
            router.push("/");
        }
        return;
    }, [router, session]);
    return (
        <div>
            <Seo title="Timetable" />
            <Calendar props={events} />
        </div>
    );
}

export async function getServerSideProps() {
    const eventArray = await Event.find({});
    const events = eventArray.map((doc) => {
        const item = doc.toObject();
        item._id = item._id.toString();
        return item;
    });
    return { props: { events } };
}
