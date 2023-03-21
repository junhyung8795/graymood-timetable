import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPugin from "@fullcalendar/interaction";
import { useRouter } from "next/router";
import AddDialog from "./AddDialog";
import UpdateAndDeleteDialog from "./UpdateAndDeleteDialog";
import styled from "@emotion/styled";

const StyleWrapper = styled.div`
    .fc .fc-timegrid-slot-minor {
        border-top-style: none;
    }
    .fc-day-number {
        font-size: 1.5em;
        color: #ffff;
    }
    .fc-day-header {
        font-size: 1.5em;
        color: #00b294;
    }
    .fc-header-toolbar {
        font-size: 10px;
        height: 90px;
    }
    .fc-toolbar-title {
        font-size: 12px;
        font-weight: 800;
    }
    .fc-toolbar-chunk:nth-of-type(1) {
        display: block;
        width: 20%;
        font-size: 9px;
        box-sizing: border-box;
    }
    .fc-toolbar-chunk:nth-of-type(2) {
        display: block;
        width: 30%;
        font-size: 10px;
        box-sizing: border-box;
    }

    .fc-toolbar-chunk:nth-of-type(3) {
        display: block;
        justify-content: center;
        align-items: center;
        width: 50.5%;
        font-size: 15px;
        box-sizing: border-box;
    }
    colgroup {
        background-color: #1f2937;
    }

    .fc-col-header-cell-cushion {
        color: white;
        text-decoration: none;
    }

    .fc-scrollgrid-sync-inner {
        background-color: #1f2937;
    }

    .fc-daygrid-day-number {
        color: white;
        text-decoration: none;
    }

    .fc-event {
        color: white;
        background-color: saddlebrown;
    }
    .fc-daygrid-body-natural {
        display: none;
    }

    .fc .fc-timegrid-slot-minor {
        border-top-style: none;
    }
`;
export default function Calendar({ props }) {
    const router = useRouter();
    const [addEventOpen, setAddEventOpen] = useState(false);
    const [updateAndDeleteEventOpen, setUpdateAndDeleteEventOpen] =
        useState(false);
    const [eventId, setEventId] = useState("");
    const [onDate, setOnDate] = useState("");
    const [onStartTime, setOnStartTime] = useState("");
    const [onEndTime, setOnEndTime] = useState("");
    const [onName, setOnName] = useState("");
    const [onDetail, setOnDetail] = useState("");
    const [loading, setLoading] = useState(false);
    const [onPassword, setOnPassword] = useState("");
    const { data: session, status } = useSession();
    const [eventEditable, setEventEditable] = useState(false);

    useEffect(() => {
        if (session?.user?.name == "manager") {
            setEventEditable(true);
        }
    }, [session?.user?.name]);

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
                password: doc.password,
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
        setLoading(true);
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
                router.push("/timeTable");
            });
        setLoading(false);
    };
    const preventDragHandler = (e) => {
        e.preventDefault();
        window.stop();
    };

    return (
        <div className="body" onDragStart={preventDragHandler}>
            {loading ? (
                <div className="loading">
                    <h3>...loading</h3>
                </div>
            ) : (
                <div></div>
            )}
            <nav className="navbar bg-body-tertiary">
                <button
                    type="button"
                    onClick={async () => {
                        setLoading(true);
                        router.push("/notice");
                        setLoading(false);
                    }}
                    className="btn btn-outline-light toNoticeLink"
                >
                    동방사용필독사항
                </button>
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
                        password={onPassword}
                        startTime={onStartTime}
                        endTime={onEndTime}
                    />
                </div>
            ) : (
                <div></div>
            )}

            <div className="calendarBody">
                <StyleWrapper>
                    <FullCalendar
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPugin,
                        ]}
                        initialView={"dayGridMonth"}
                        headerToolbar={{
                            start: "prev,next",
                            center: "title",
                            end: "dayGridMonth, timeGridWeek",
                        }}
                        height={"90vh"}
                        events={parsedEvents}
                        editable={eventEditable}
                        eventDrop={handleMoveEvent}
                        locale="en"
                        eventOverlap={false}
                        eventClick={({ event }) => {
                            handleUpdateAndDeleteEventOpen();
                            setEventId(event.id);
                            setOnDate(event._def.extendedProps.date);
                            setOnName(event._def.extendedProps.name);
                            setOnDetail(event._def.extendedProps.detail);
                            setOnPassword(event._def.extendedProps.password);
                            setOnStartTime(event._def.extendedProps.startTime);
                            setOnEndTime(event._def.extendedProps.endTime);
                        }}
                        stickyHeaderDates="true"
                        eventColor="#C1BAFD"
                        eventTextColor="white"
                        displayEventTime={false}
                        eventDragMinDistance={1}
                    />
                </StyleWrapper>
            </div>
            <style jsx>{`
                .body {
                    background-color: #111827;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 110vh;
                    width: 100vw;
                    overflow: scroll;
                    position: relative;
                }
                .loading {
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    color: white;
                }
                .navbar {
                    display: flex;
                    justify-content: space-between;
                    width: 95%;
                    margin-top: 20px;
                    margin-bottom: 20px;
                }
                .toNoticeLink {
                    color: blue;
                }
                .calendarBody {
                    background-color: #1f2937;
                    color: white;
                    width: 100%;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}
