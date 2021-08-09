declare interface CalendarEvent {
  id: string;
  title: string;
  startBox: number;
  endBox: number;
  eventDate: Date;
  urgent: boolean;
}

declare interface CalendarDragEvent {
  id: string;
  title: string;
  size: number;
  urgent: boolean;
}

declare interface GlobalStateObject {
  events: CalendarEvent[];
  addEvent(event: CalendarEvent): void;
  removeEvent(id: string): void;
}

interface BaseActionPayload {
  type?: string;
}

interface CreateActionPayload extends BaseActionPayload {
  payload: CalendarEvent;
}

interface RemoveActionPayload extends BaseActionPayload {
  payload: string;
}

declare type ActionPayload = CreateActionPayload | RemoveActionPayload;
declare interface CalendarProps {
  startDate: Date;
}
declare interface BoxProps {
  date: Date;
  boxNumber: number;
}
declare interface LabelBoxProps {
  boxNumber: number;
}
declare interface DayProps {
  date: Date;
}
declare interface EventDayObject {
  [key: string]: CalendarEvent[];
}
declare interface NewEventProps {
  closeCallback: any;
  injectedDate: Date;
  injectedStartBox?: number;
  injectedEndBox?: number;
  injectedTitle?: string;
  injectedId?: string;
  injectUrgent?: boolean;
  isOpen: boolean;
}
declare interface CalendarContainerProps {
  startDate: Date;
}

declare interface EventBubbleProps {
  left: number; //Assuming RTL
  parentWidth: number;
  title: string;
  startBox: number;
  date: Date;
  endBox: number;
  id: string;
  urgent: boolean;
}
declare interface GlobalStateObject {
  events: CalendarEvent[];
  addEvent(event: CalendarEvent): void;
  removeEvent(id: string): void;
  editEvent(event: CalendarEvent): void;
}
