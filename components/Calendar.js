import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPugin from "@fullcalendar/interaction";

export default function Calendar() {
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth, timeGridWeek, timeGridDay",
                }}
                height={"90vh"}
                events={[
                    { title: "event sadasd", date: "2023-01-01" },
                    { title: "event sadasd", date: "2023-01-01" },
                    { title: "event sadasd", date: "2023-01-01" },
                    { title: "event sadasd", date: "2023-01-01" },
                    { title: "event sadasd", date: "2023-01-01" },
                    { title: "event sadasd", date: "2023-01-01" },
                    { title: "event sadasd", date: "2023-01-01" },
                    { title: "event 2", date: "2023-01-02" },
                    { title: "event 2", date: "2023-01-31" },
                    { title: "event 2", date: "2023-01-31" },

                    { title: "event 2", date: "2023-01-31" },
                    { title: "event 2", date: "2023-01-31" },
                    { title: "event 2", date: "2023-01-31" },
                    { title: "event 2", date: "2023-01-31" },
                ]}
                editable="false"
            />
        </div>
    );
}
