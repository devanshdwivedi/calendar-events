import React, { useContext, useState } from "react";
import { BOX_HEIGHT } from "../constants/CalendarConsants";
import { fetchTime } from "../utils/CalendarUtils";
import { EventContext } from "../context/CalendarEventsState";
import EventModal from "../components/EventModal";

let boxHeight = BOX_HEIGHT + "px";

export default function Box({ date, boxNumber }: BoxProps) {
  const { editEvent } = useContext(EventContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const eventBubbleObj: CalendarDragEvent = JSON.parse(
      event.dataTransfer.getData("eventBubble")
    );
    editEvent({
      id: eventBubbleObj.id,
      title: eventBubbleObj.title,
      startBox: boxNumber,
      endBox: boxNumber + eventBubbleObj.size,
      eventDate: date,
      urgent: eventBubbleObj.urgent,
    });
  };

  return (
    <>
      <EventModal
        isOpen={isModalOpen}
        injectedDate={date}
        injectedStartBox={boxNumber}
        injectedEndBox={boxNumber + 2}
        closeCallback={() => setIsModalOpen(false)}
      />
      {boxNumber % 2 === 0 ? (
        <div
          onDrop={(event) => onDrop(event)}
          onDragOver={(event) => onDragOver(event)}
          onClick={() => setIsModalOpen(true)}
          style={{
            borderTop: "1px solid",
            borderColor: "black",
            height: boxHeight,
            boxSizing: "border-box",
            cursor: "pointer",
          }}
        />
      ) : (
        <div
          onDrop={(event) => onDrop(event)}
          onDragOver={(event) => onDragOver(event)}
          onClick={() => setIsModalOpen(true)}
          style={{
            height: boxHeight,
            boxSizing: "border-box",
            cursor: "pointer",
          }}
        />
      )}
    </>
  );
}

export function LabelBox({ boxNumber }: any) {
  let labelBoxWidth = "40px";

  return (
    <>
      {boxNumber % 2 === 0 ? (
        <div
          style={{
            height: boxHeight,
            width: labelBoxWidth,
            boxSizing: "content-box",
            fontSize: "0.8em",
          }}
        >
          {fetchTime(boxNumber)}
        </div>
      ) : (
        <div
          style={{
            height: boxHeight,
            width: labelBoxWidth,
            boxSizing: "content-box",
          }}
        />
      )}
    </>
  );
}
