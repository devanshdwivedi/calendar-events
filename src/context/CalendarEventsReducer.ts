import { ADD_EVENT, EDIT_EVENT, REMOVE_EVENT } from "./CalendarEventsConstants";

export default function CalendarEventsReducer(
  state: any,
  action: ActionPayload
) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case EDIT_EVENT:
      const newEvents = [...state.events];
      let editEventIndex = newEvents.findIndex((event: any) => {
        if (
          typeof action.payload === "object" &&
          event.id === action.payload.id
        ) {
          return true;
        }
      });
      newEvents[editEventIndex] = action.payload;
      return {
        ...state,
        events: newEvents,
      };

    case REMOVE_EVENT:
      return {
        ...state,
        events: state.events.filter(
          (event: any) => event.id !== action.payload
        ),
      };

    default:
      return state;
  }
}
