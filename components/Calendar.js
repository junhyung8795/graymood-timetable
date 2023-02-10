import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPugin from "@fullcalendar/interaction";
import { useRouter } from "next/router";
import AddDialog from "./AddDialog";
import UpdateAndDeleteDialog from "./UpdateAndDeleteDialog";
import Button from "@mui/joy/Button";

export default function Calendar({ props }) {
    const router = useRouter();
    const [addEventOpen, setAddEventOpen] = useState(false);
    const [updateAndDeleteEventOpen, setUpdateAndDeleteEventOpen] =
        useState(false);

    const parsedEvents = props.map((doc) => {
        const title = `${doc.detail}  ${doc.name}`;
        const start = `${doc.date}T${doc.startTime}`;
        const end = `${doc.date}T${doc.endTime}`;
        const id = `${doc._id}`;

        return {
            title,
            start,
            end,
            id,
            extendedProps: {
                detail: doc.detail,
                name: doc.name,
                startTime: doc.startTime,
                endTime: doc.endTime,
                date: doc.date,
            },
        };
    });
    const handleAddEventOpen = () => {
        setAddEventOpen(true);
    };
    const handleUpdateAndDeleteEventOpen = () => {
        setUpdateAndDeleteEventOpen(true);
    };
    const dateModifier = (d) => {
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, "-");
    };

    const timeModifier = (d) => {
        return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(11, 16)
            .replace(/-/g, "-");
    };
    const handleMoveEvent = async ({ event }) => {
        const date = dateModifier(event.start);
        const startTime = timeModifier(event.start);
        const endTime = timeModifier(event.end);
        const id = event.id;
        await fetch(`/api/timetable/moveEvent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                date,
                startTime,
                endTime,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.statusCode === "200") {
                    router.push("/timeTable");
                } else if (data.statusCode === "500") {
                    router.push("/timeTable");
                }
            });
    };
    return (
        <div>
            <Button onClick={handleAddEventOpen}>Let's reserve</Button>
            {addEventOpen ? (
                <div>
                    <AddDialog setAddEventOpen={setAddEventOpen} />
                </div>
            ) : (
                <div></div>
            )}
            {updateAndDeleteEventOpen ? (
                <div>
                    <UpdateAndDeleteDialog
                        setUpdateAndDeleteEventOpen={
                            setUpdateAndDeleteEventOpen
                        }
                    />
                </div>
            ) : (
                <div></div>
            )}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth, timeGridWeek, timeGridDay",
                }}
                height={"90vh"}
                events={parsedEvents}
                editable="false"
                eventDrop={handleMoveEvent}
                locale="ko"
                eventOverlap={false}
                eventMouseEnter={(info) => {
                    // var eventDate = info.event.start;
                    // var eventno = info.event.end;
                    // // console.log(eventDate);
                    // // console.log(eventno);
                    // //example output: "Wed Oct 02 2019 00:00:00 GMT-0600 (Central Standard Time)"
                }}
                eventClick={handleUpdateAndDeleteEventOpen}
            />
        </div>
    );
}
