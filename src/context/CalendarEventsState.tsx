import React, { createContext, useEffect, useReducer } from "react";
import { generateId } from "../utils/CalendarUtils";
import { ADD_EVENT, EDIT_EVENT, REMOVE_EVENT } from "./CalendarEventsConstants";
import CalendarEventsReducer from "./CalendarEventsReducer";
import dayjs from "dayjs";

const localStorageKey = "calendarEvents";

const getEventsFromLocalStorage = () => {
  let eventsStr: string | null = window.localStorage.getItem(localStorageKey);
  let events: CalendarEvent[];
  if (!eventsStr) {
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
        id: generateId(1),
        title: "Meeting leadership",
        eventDate: dayjs(new Date()).add(1, "day").toDate(),
        startBox: 5,
        endBox: 11,
        urgent: true,
      },
      {
        id: generateId(2),
        title: "Manager 1:1",
        eventDate: dayjs(new Date()).add(1, "day").toDate(),
        startBox: 5,
        endBox: 8,
        urgent: false,
      },
      {
        id: generateId(3),
        title: "PR review",
        eventDate: dayjs(new Date()).subtract(1, "day").toDate(),
        startBox: 7,
        endBox: 11,
        urgent: true,
      },
      {
        id: generateId(4),
        title: "Second PR",
        eventDate: dayjs(new Date()).add(2, "day").toDate(),
        startBox: 9,
        endBox: 10,
        urgent: false,
      },
    ];
  } else {
    events = JSON.parse(eventsStr);
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
