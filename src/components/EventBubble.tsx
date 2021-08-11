import React, { useCallback, useContext, useRef } from "react";
import EventModal from "../components/EventModal";
import { useState } from "react";
import { BOX_HEIGHT, LEFT_MARGIN } from "../constants/CalendarConsants";
import { fetchTime } from "../utils/CalendarUtils";
import { MEETING_THEMES } from "../constants/ThemeConstants";
import { EventContext } from "../context/CalendarEventsState";

export function EventBubble({
  startBox,
  date,
  endBox,
  title,
  left,
  parentWidth,
  id,
  urgent,
  highlightEvent,
}: EventBubbleProps) {
  /**
   * Manipulate DOM height/Width and left properties to render Multiple event bubbles
   */
  let height = (endBox - startBox) * BOX_HEIGHT;
  let actualLeft = left * LEFT_MARGIN;
  let width = parentWidth - actualLeft;

  const { editEvent } = useContext(EventContext);
  const handleDragStart = (event: React.DragEvent<HTMLSpanElement>) => {
    const taskData: CalendarDragEvent = {
      id: id,
      title: title,
      size: endBox - startBox,
      urgent,
    };
    event.dataTransfer.setData("eventBubble", JSON.stringify(taskData));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const eventBubbleObj: CalendarDragEvent = JSON.parse(
      event.dataTransfer.getData("eventBubble")
    );
    editEvent({
      id: eventBubbleObj.id,
      title: eventBubbleObj.title,
      startBox: startBox,
      endBox: startBox + eventBubbleObj.size,
      eventDate: date,
      urgent: eventBubbleObj.urgent,
    });
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <EventModal
        injectUrgent={urgent}
        isOpen={isModalOpen}
        injectedId={id}
        injectedTitle={title}
        injectedDate={date}
        injectedStartBox={startBox}
        injectedEndBox={endBox}
        closeCallback={() => setIsModalOpen(false)}
      />
      <div
        onDrop={(event) => onDrop(event)}
        onDragOver={(event) => onDragOver(event)}
        onClick={() => setIsModalOpen(true)}
        style={{
          border:  highlightEvent ? "2px solid red" : "1px solid white",
          position: "absolute",
          color: urgent ? "White" : "initial",
          backgroundColor: urgent
            ? "#" + MEETING_THEMES["URGENT"]
            : "#" + MEETING_THEMES["DEFAULT"],
          height: height + "px",
          left: actualLeft + "px",
          width: width,
          fontSize: "0.8em",
          cursor: "pointer",
        }}
      >
        <div>{title}</div>
        <div>
          <span>{fetchTime(startBox) + " - " + fetchTime(endBox)}</span>
          <span
            style={{ cursor: "move" }}
            onDragStart={(event) => handleDragStart(event)}
            draggable={true}
          >
            {" | Hold to Drag"}
          </span>
        </div>
      </div>
    </>
  );
}
