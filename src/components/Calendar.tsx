import React, { useState, useEffect, useCallback, useContext } from "react";
import Day, { LabelDay } from "./Day";
import { debounce, monthNames, useDebouncedEffect } from "../utils/CalendarUtils";
import EventModal from "./EventModal";
import Modal from "react-modal";
import dayjs from "dayjs";
import { EventContext } from "../context/CalendarEventsState";

function Calendar({ startDate }: CalendarProps) {

  const { highlightEvents } = useContext(EventContext);

  const debouncedHighLights = debounce(highlightEvents, 1000);
  
  const [startOfWeek, setStartOfWeek] = useState<Date>();
  const [days, setDays] = useState<Date[]>();
  const [mainDate, setMainDate] = useState<Date>();

  const [searchItem, setSearchItem] = useState<string>("");

  const debouceRequest = useCallback(searchItem => debouncedHighLights(searchItem), []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouceRequest(e.target.value);
    setSearchItem(e.target.value);
  };

  useEffect(() => {
    if (startDate) {
      setMainDate(startDate);
    }
  }, [startDate]);

  useDebouncedEffect(() => {
    if (mainDate) {
      setStartOfWeek(dayjs(mainDate).startOf("week").toDate());
    }
  }, [mainDate], 1000);

  useEffect(() => {
    if (startOfWeek) {
      let week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        let newDay = dayjs(startOfWeek).add(i, "days").toDate();
        week.push(newDay);
      }
      setDays(week);
    }
  }, [startOfWeek]);

  useEffect(() => {}, [days]);

  const advanceWeek = () => {
    let newDate = dayjs(mainDate).add(7, "day").toDate();
    setMainDate(newDate);
  };

  const retractWeek = () => {
    let newDate = dayjs(mainDate).subtract(7, "day").toDate();
    setMainDate(newDate);
  };

  Modal.setAppElement("#modal");
  if (Modal.defaultStyles.overlay) {
    Modal.defaultStyles.overlay.backgroundColor = "initial";
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const styleObject = {
    cursor: "pointer",
    color: "white",
    backgroundColor: "black",
    borderRadius: "30px",
    width: "40px",
    height: "40px",
  };

  return (
    <>
      <EventModal
        isOpen={isModalOpen}
        injectedDate={new Date()}
        closeCallback={() => setIsModalOpen(false)}
      />
      <div>
        <input onChange={onChange} type="text" value={searchItem} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <button
            style={{ ...styleObject, margin: "0 5px 0 0" }}
            onClick={retractWeek}
          >
            {"<"}
          </button>
          <button
            style={{ ...styleObject, margin: "0 20px 0 5px" }}
            onClick={advanceWeek}
          >
            {">"}
          </button>
          <button
            style={{ ...styleObject, margin: "0 25px" }}
            onClick={() => setIsModalOpen(true)}
          >
            {"+"}
          </button>
        </div>
        <div>
          {mainDate && (
            <div
              style={{
                textAlign: "center",
                fontSize: "2em",
                fontWeight: "bolder",
                padding: "0 0 20px 0",
              }}
            >
              {monthNames[mainDate.getMonth()] + " " + mainDate.getFullYear()}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {
          <div
            key={"inv-parent"}
            style={{ width: "100", padding: "0 10px", flex: 0.2 }}
          >
            <LabelDay />
          </div>
        }
        {days &&
          days.length > 0 &&
          days.map((day: Date, index: number) => {
            return (
              <div
                key={day.toDateString() + index + "-parent"}
                style={{ width: "100", padding: "0 10px", flex: 1 }}
              >
                <Day key={day.toDateString() + index + "-child"} date={day} />
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Calendar;
