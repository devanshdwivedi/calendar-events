import React from "react";
import Calendar from "./components/Calendar";

import { EventProvider } from "./context/CalendarEventsState";

export default function CalendarContainer(props: CalendarContainerProps) {
  return (
    <EventProvider>
      <Calendar startDate={props.startDate} />
    </EventProvider>
  );
}
