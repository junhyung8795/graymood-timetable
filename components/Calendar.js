import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPugin from "@fullcalendar/interaction";

export default function Calendar(props) {
    console.log(props.props);
    console.log(typeof props);
    const seemEvents = props.props.map((doc) => {
        const title = `${doc.detail}  ${doc.name}`;
        const start = `${doc.date}T${doc.startTime}`;
        const end = `${doc.date}T${doc.endTime}`;
        return { title, start, end };
    });
    console.log(seemEvents);
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
                events={seemEvents}
                editable="false"
            />
        </div>
    );
}
