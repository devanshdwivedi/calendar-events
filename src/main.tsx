import React from "react";
import ReactDOM from "react-dom";
import CalendarContainer from "./CalendarContainer";

let startDate: Date = new Date();

ReactDOM.render(
  <React.StrictMode>
    <CalendarContainer startDate={startDate} />
  </React.StrictMode>,
  document.getElementById("root")
);
