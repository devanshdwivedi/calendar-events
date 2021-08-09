import React, { useContext, useState } from "react";
import { EventContext } from "../context/CalendarEventsState";
import { generateId, getBox } from "../utils/CalendarUtils";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";

export default function EventModal({
  injectedId,
  isOpen,
  closeCallback,
  injectedDate,
  injectedTitle,
  injectedEndBox,
  injectedStartBox,
  injectUrgent,
}: NewEventProps) {
  const getHour = () => {
    let coeff = 1000 * 60 * 30;
    const d = new Date();
    return new Date(Math.round(d.getTime() / coeff) * coeff);
  };

  const setHour = (date: Date, boxNum: number) => {
    let baseDate = dayjs(new Date(date)).startOf("date").toDate();
    let coeff = 1000 * 60 * 30 * boxNum;
    return new Date(baseDate.getTime() + coeff);
  };

  const { addEvent, editEvent, removeEvent } = useContext(EventContext);
  const startHourDate = getHour();

  const [title, setTitle] = useState<string>(
    injectedTitle ? injectedTitle : ""
  );
  const [startDate, setStartDate] = useState<any>(injectedDate);
  const [hourStartDate, setHourStartDate] = useState<any>(
    injectedStartBox || injectedStartBox === 0
      ? setHour(injectedDate, injectedStartBox)
      : startHourDate
  );
  const [hourEndDate, setHourEndDate] = useState<any>(
    injectedEndBox
      ? setHour(injectedDate, injectedEndBox)
      : dayjs(startHourDate).add(1, "hour").toDate()
  );
  const [urgent, setUrgent] = useState<boolean>(
    injectedId ? (injectUrgent ? injectUrgent : false) : false
  );

  const isTitleProvided = () => {
    if (title && title.length > 0) {
      return true;
    }
    return false;
  };

  const isTimeValid = () => {
    if (hourStartDate >= hourEndDate) {
      return false;
    }
    return true;
  };

  const isSubmittable = () => {
    if (isTitleProvided() && isTimeValid()) {
      return true;
    }
    return false;
  };

  const createEvent = (event: React.FormEvent<HTMLFormElement>) => {
    if (!injectedId) {
      const id = generateId();
      addEvent({
        id: id,
        title: title,
        startBox: getBox(hourStartDate),
        endBox: getBox(hourEndDate),
        eventDate: startDate,
        urgent,
      });
    } else {
      editEvent({
        id: injectedId,
        title: title,
        startBox: getBox(hourStartDate),
        endBox: getBox(hourEndDate),
        eventDate: startDate,
        urgent,
      });
    }
    event.preventDefault();
    closeCallback();
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const buttonStyleObject = {
    cursor: "pointer",
    color: "white",
    backgroundColor: "black",
    borderRadius: "15px",
    height: "30px",
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeCallback}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div style={{ height: "400px", padding: "20px" }}>
        <h2>{injectedId ? "Edit Event" : "New Event"}</h2>
        <form onSubmit={createEvent}>
          <div style={{ margin: "20px 0" }}>
            <label>Event name:</label>
            <span style={{ margin: "0 0 0 10px" }}>
              <input
                type="text"
                name="name"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </span>
          </div>
          <div style={{ margin: "20px 0" }}>
            <label>Date:</label>
            <span style={{ margin: "0 0 0 55px" }}>
              <DatePicker
                selected={startDate}
                shouldCloseOnSelect={true}
                onChange={(date) => setStartDate(date)}
              />
            </span>
          </div>
          <div style={{ margin: "20px 0" }}>
            <label>Start time:</label>
            <span style={{ margin: "0 0 0 23px" }}>
              <DatePicker
                selected={hourStartDate}
                onChange={(date) => setHourStartDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </span>
          </div>
          <div style={{ margin: "20px 0" }}>
            <label>End time:</label>
            <span style={{ margin: "0 0 0 28px" }}>
              <DatePicker
                selected={hourEndDate}
                onChange={(date) => setHourEndDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </span>
          </div>
          <div style={{ margin: "20px 0" }}>
            <label>Urgent event:</label>
            <span style={{ margin: "0 0 0 23px" }}>
              <input
                type="checkbox"
                checked={urgent}
                onChange={() => setUrgent(!urgent)}
              />
            </span>
          </div>
          <div style={{ margin: "20px 0" }}>
            <button
              style={buttonStyleObject}
              type="submit"
              disabled={!isSubmittable()}
            >
              {"Save"}
            </button>
          </div>
          <div style={{ margin: "20px 0" }}>
            {injectedId && (
              <button
                style={buttonStyleObject}
                onClick={() => removeEvent(injectedId)}
              >
                {"Delete"}
              </button>
            )}
          </div>
          <div style={{ margin: "20px 0" }}>
            {!isTimeValid() && (
              <div style={{ color: "red" }}>
                {"Select a valid start and end time"}
              </div>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
