import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPugin from "@fullcalendar/interaction";
import { useRouter } from "next/router";
import AddDialog from "./AddDialog";
import UpdateAndDeleteDialog from "./UpdateAndDeleteDialog";
import Link from "next/link";

export default function Calendar({ props }) {
    const router = useRouter();
    const [addEventOpen, setAddEventOpen] = useState(false);
    const [updateAndDeleteEventOpen, setUpdateAndDeleteEventOpen] =
        useState(false);
    const [eventId, setEventId] = useState("");
    const [onDate, setOnDate] = useState("");
    const [onName, setOnName] = useState("");
    const [onDetail, setOnDetail] = useState("");

    const parsedEvents = props.map((doc) => {
        const title = `${doc.name}  ${doc.detail}`;
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
        <div
            style={{
                backgroundColor: "#111827",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "110vh",
                width: "100vw",
                overflow: "scroll",
            }}
        >
            <nav
                className="navbar bg-body-tertiary"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "95%",
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            >
                <Link
                    href="/notice"
                    style={{ textDecoration: "none", color: "white" }}
                >
                    <button type="button" className="btn btn-outline-light">
                        동방사용필독사항
                    </button>
                </Link>
                <div>
                    <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={handleAddEventOpen}
                    >
                        예약하기
                    </button>
                </div>
            </nav>
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
                        id={eventId}
                        date={onDate}
                        name={onName}
                        detail={onDetail}
                    />
                </div>
            ) : (
                <div></div>
            )}

            <div
                style={{
                    backgroundColor: "#1F2937",
                    color: "white",
                    width: "100%",
                    borderRadius: "10px ",
                }}
            >
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPugin]}
                    initialView={"dayGridMonth"}
                    headerToolbar={{
                        start: "prev,next",
                        center: "title",
                        end: "dayGridMonth, timeGridWeek, timeGridDay",
                    }}
                    height={"90vh"}
                    events={parsedEvents}
                    editable="false"
                    eventDrop={handleMoveEvent}
                    locale="en"
                    eventOverlap={false}
                    eventClick={({ event }) => {
                        handleUpdateAndDeleteEventOpen();
                        setEventId(event.id);
                        setOnDate(event._def.extendedProps.date);
                        setOnName(event._def.extendedProps.name);
                        setOnDetail(event._def.extendedProps.detail);
                    }}
                    stickyHeaderDates="true"
                    eventColor="#C1BAFD"
                    eventTextColor="white"
                    displayEventTime={false}
                />
            </div>
        </div>
    );
}
