import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPugin from "@fullcalendar/interaction";

export default function Calendar({ props }) {
    const parsedEvents = props.map((doc) => {
        const title = `${doc.detail}  ${doc.name}`;
        const start = `${doc.date}T${doc.startTime}`;
        const end = `${doc.date}T${doc.endTime}`;
        const id = `${doc._id}`;
        return { title, start, end, id };
    });
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
                events={parsedEvents}
                editable="false"
                eventDragMinDistance="0.1"
                eventDragStart={(info) => {
                    setTimeout(() => {
                        console.log("Delayed for 3 second.");
                    }, "1000");
                }}
                eventDrop={(info) => {
                    var eventDate = info.event.start;
                    var eventno = info.event.end;
                    console.log(eventDate);
                    console.log(eventno);
                }}
                locale="ko"
                eventOverlap={false}
                eventMouseEnter={(info) => {
                    // var eventDate = info.event.start;
                    // var eventno = info.event.end;
                    // // console.log(eventDate);
                    // // console.log(eventno);
                    // // console.log(info.event);
                    // //example output: "Wed Oct 02 2019 00:00:00 GMT-0600 (Central Standard Time)"
                }}
                eventClick={(info) => {
                    console.log(info.event.id);
                }}
            />
        </div>
    );
}
