import React, { createContext, useEffect, useReducer } from "react";
import { generateId } from "../utils/CalendarUtils";
import { ADD_EVENT, EDIT_EVENT, REMOVE_EVENT } from "./CalendarEventsConstants";
import CalendarEventsReducer from "./CalendarEventsReducer";
import dayjs from "dayjs";

const localStorageKey = "calendarEvents";

const getEventsFromLocalStorage = () => {
  let events: any = window.localStorage.getItem(localStorageKey);
  if (!events) {
    events = [
      {
        id: generateId(),
        title: "Assignment evaluation",
        eventDate: new Date(),
        startBox: 2,
        endBox: 5,
        urgent: false,
      },
      {
        id: generateId(),
        title: "Meeting leadership",
        eventDate: dayjs(new Date()).add(1, "day").toDate(),
        startBox: 5,
        endBox: 11,
        urgent: true,
      },
      {
        id: generateId(),
        title: "Manager 1:1",
        eventDate: dayjs(new Date()).add(1, "day").toDate(),
        startBox: 5,
        endBox: 8,
        urgent: false,
      },
      {
        id: generateId(),
        title: "PR review",
        eventDate: dayjs(new Date()).subtract(1, "day").toDate(),
        startBox: 7,
        endBox: 11,
        urgent: true,
      },
      {
        id: generateId(),
        title: "Second PR",
        eventDate: dayjs(new Date()).add(2, "day").toDate(),
        startBox: 9,
        endBox: 10,
        urgent: false,
      },
    ];
  } else {
    events = JSON.parse(events);
  }
  return events;
};

const initialState: GlobalStateObject = {
  events: getEventsFromLocalStorage(),
  addEvent: (event: CalendarEvent) => {},
  removeEvent: (id: string) => {},
  editEvent: (event: CalendarEvent) => {},
};

export const EventContext = createContext(initialState);

export const EventProvider = (props: any) => {
  const [state, dispatch] = useReducer(CalendarEventsReducer, initialState);

  useEffect(() => {
    if (state && state.events) {
      window.localStorage.setItem(
        localStorageKey,
        JSON.stringify(state.events)
      );
    }
  }, [state]);

  function addEvent(event: CalendarEvent) {
    dispatch({
      type: ADD_EVENT,
      payload: event,
    });
  }

  function removeEvent(id: string) {
    dispatch({
      type: REMOVE_EVENT,
      payload: id,
    });
  }

  function editEvent(event: CalendarEvent) {
    dispatch({
      type: EDIT_EVENT,
      payload: event,
    });
  }

  return (
    <EventContext.Provider
      value={{
        events: state.events,
        addEvent,
        removeEvent,
        editEvent,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};
