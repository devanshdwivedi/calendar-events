import React, { useRef, useEffect, useContext, useState } from "react";
import Box, { LabelBox } from "./Box";
import { daysOfWeek } from "../utils/CalendarUtils";
import { EventContext } from "../context/CalendarEventsState";
import { EventBubble } from "./EventBubble";
import dayjs from "dayjs";

export default function Day({ date }: DayProps) {
  let [eventDayObject, setEventDayObject] = useState<EventDayObject>();

  const { events } = useContext(EventContext);
  const [parentWidth, setParentWidth] = useState<number>();
  const parentRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const boxNumbers: number[] = [];

  for (let i = 0; i < 48; i++) {
    boxNumbers.push(i);
  }

  const updateWidth = () => {
    if (parentRef && parentRef.current) {
      let width = parentRef.current.offsetWidth;
      setParentWidth(width);
    }
  };

  useEffect(() => {
    /**
     * Extracting the width of the parent container
     */
    updateWidth();
  }, [parentRef]);

  const renderDayEvents = (boxNumber: number) => {
    if (
      parentWidth &&
      eventDayObject &&
      Object.keys(eventDayObject).length > 0 &&
      eventDayObject[boxNumber]
    ) {
      let currentEvents = eventDayObject[boxNumber];
      /**
       * Sort the events in the same start box, the longer events should be first and the shorter ones should be nestled inside
       */
      currentEvents.sort(
        (firstEvent: CalendarEvent, secondEvent: CalendarEvent) => {
          return secondEvent.endBox - firstEvent.endBox;
        }
      );
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {currentEvents.map((event: CalendarEvent, index: number) => {
            return (
              <EventBubble
                urgent={event.urgent}
                date={date}
                id={event.id}
                key={event.id}
                title={event.title}
                startBox={event.startBox}
                endBox={event.endBox}
                left={index}
                parentWidth={parentWidth}
              />
            );
          })}
        </div>
      );
    }
    return <></>;
  };

  const generateEventDayObject = () => {
    const newEventDayObj: any = {};
    events.forEach((event: CalendarEvent) => {
      if (dayjs(event.eventDate).isSame(date, "day")) {
        let startBox = event.startBox;
        if (newEventDayObj.hasOwnProperty(startBox)) {
          newEventDayObj[startBox].push(event);
        } else {
          newEventDayObj[startBox] = [event];
        }
      }
    });
    setEventDayObject(newEventDayObj);
  };

  useEffect(() => {
    if (events && events.length > 0) {
      generateEventDayObject();
    }
  }, [events]);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <>
      <div
        ref={parentRef}
        style={{ width: "100%", textAlign: "center", minWidth: "150px" }}
      >
        <div style={{ fontSize: "0.8em" }}>
          {daysOfWeek[date.getDay()].toUpperCase()}
        </div>
        <h3 style={{ fontSize: "2em" }}>{date.getDate()}</h3>
      </div>
      {boxNumbers &&
        boxNumbers.length > 0 &&
        boxNumbers.map((boxNum: number) => {
          return (
            <div key={date.toDateString() + boxNum}>
              <div
                key={date.toDateString() + boxNum + "child"}
                style={{ position: "absolute" }}
              >
                {renderDayEvents(boxNum)}
              </div>
              <Box
                key={date.toDateString() + boxNum + "box"}
                date={date}
                boxNumber={boxNum}
              />
            </div>
          );
        })}
    </>
  );
}

export function LabelDay() {
  const boxNumbers: number[] = [];

  for (let i = 0; i < 48; i++) {
    boxNumbers.push(i);
  }

  return (
    <>
      <div style={{ height: "110px" }}></div>
      {boxNumbers &&
        boxNumbers.length > 0 &&
        boxNumbers.map((boxNum: number, index: number) => {
          return (
            <LabelBox key={"label-" + boxNum + "-box"} boxNumber={boxNum} />
          );
        })}
    </>
  );
}
