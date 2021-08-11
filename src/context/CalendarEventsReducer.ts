import { ADD_EVENT, EDIT_EVENT, HIGHLIGHT_EVENT, REMOVE_EVENT } from "./CalendarEventsConstants";

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

    case HIGHLIGHT_EVENT:
      
      const updatedEvents = [...state.events].map((event: any)=>{
        if(action.payload === ""){
          event.highlightEvent = false;
        }
        else if(typeof(action.payload) === 'string' && event.title.toLowerCase().indexOf(action.payload.toLowerCase()) > -1){
          event.highlightEvent = true;
        }else{
          event.highlightEvent = false;
        }
        return event;
      });
      return {
        ...state,
        events: updatedEvents,
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
