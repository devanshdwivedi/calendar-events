import { useEffect } from "react";

export const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const useDebouncedEffect = (effect: any, deps: any, delay:any) => {
    useEffect(() => {
        const handler = setTimeout(() => effect(), delay);

        return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps || [], delay]);
}

export const debounce = (callback: any, delay: number) => {

  let timerId: any = null;

  return function(...args: any) {
    if(timerId === null){
      timerId = setTimeout(()=>{
        callback(...args);
        timerId = null;
      }, delay)
    }else{
      clearTimeout(timerId);
      timerId = setTimeout(()=>{
        callback(...args);
        timerId = null;
      }, delay)
    }
  }
};

export const daysOfWeek: string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export const generateId = (add?: number) => {
  const addValue = add ? add : 0;
  return (new Date().valueOf() + addValue).toString();
};

export const fetchTime = (boxNumber: number) => {
  switch (boxNumber) {
    case 0:
      return "12:00 AM";
    case 1:
      return "12:30 AM";
    case 2:
      return "1:00 AM";
    case 3:
      return "1:30 AM";
    case 4:
      return "2:00 AM";
    case 5:
      return "2:30 AM";
    case 6:
      return "3:00 AM";
    case 7:
      return "3:30 AM";
    case 8:
      return "4:00 AM";
    case 9:
      return "4:30 AM";
    case 10:
      return "5:00 AM";
    case 11:
      return "5:30 AM";
    case 12:
      return "6:00 AM";
    case 13:
      return "6:30 AM";
    case 14:
      return "7:00 AM";
    case 15:
      return "7:30 AM";
    case 16:
      return "8:00 AM";
    case 17:
      return "8:30 AM";
    case 18:
      return "9:00 AM";
    case 19:
      return "9:30 AM";
    case 20:
      return "10:00 AM";
    case 21:
      return "10:30 AM";
    case 22:
      return "11:00 AM";
    case 23:
      return "11:30 AM";
    case 24:
      return "12:00 PM";
    case 25:
      return "12:30 PM";
    case 26:
      return "1:00 PM";
    case 27:
      return "1:30 PM";
    case 28:
      return "2:00 PM";
    case 29:
      return "2:30 PM";
    case 30:
      return "3:00 PM";
    case 31:
      return "3:30 PM";
    case 32:
      return "4:00 PM";
    case 33:
      return "4:30 PM";
    case 34:
      return "5:00 PM";
    case 35:
      return "5:30 PM";
    case 36:
      return "6:00 PM";
    case 37:
      return "6:30 PM";
    case 38:
      return "7:00 PM";
    case 39:
      return "7:30 PM";
    case 40:
      return "8:00 PM";
    case 41:
      return "8:30 PM";
    case 42:
      return "9:00 PM";
    case 43:
      return "9:30 PM";
    case 44:
      return "10:00 PM";
    case 45:
      return "10:30 PM";
    case 46:
      return "11:00 PM";
    case 47:
      return "11:30 PM";
  }
};

function formatAMPM(date: Date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  let minutesStr = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutesStr + " " + ampm;
  return strTime;
}

export const getBox = (date: Date) => {
  const getDateStr = formatAMPM(date);
  switch (getDateStr) {
    case "12:00 AM":
      return 0;
    case "12:30 AM":
      return 1;
    case "1:00 AM":
      return 2;
    case "1:30 AM":
      return 3;
    case "2:00 AM":
      return 4;
    case "2:30 AM":
      return 5;
    case "3:00 AM":
      return 6;
    case "3:30 AM":
      return 7;
    case "4:00 AM":
      return 8;
    case "4:30 AM":
      return 9;
    case "5:00 AM":
      return 10;
    case "5:30 AM":
      return 11;
    case "6:00 AM":
      return 12;
    case "6:30 AM":
      return 13;
    case "7:00 AM":
      return 14;
    case "7:30 AM":
      return 15;
    case "8:00 AM":
      return 16;
    case "8:30 AM":
      return 17;
    case "9:00 AM":
      return 18;
    case "9:30 AM":
      return 19;
    case "10:00 AM":
      return 20;
    case "10:30 AM":
      return 21;
    case "11:00 AM":
      return 22;
    case "11:30 AM":
      return 23;
    case "12:00 PM":
      return 24;
    case "12:30 PM":
      return 25;
    case "1:00 PM":
      return 26;
    case "1:30 PM":
      return 27;
    case "2:00 PM":
      return 28;
    case "2:30 PM":
      return 29;
    case "3:00 PM":
      return 30;
    case "3:30 PM":
      return 31;
    case "4:00 PM":
      return 32;
    case "4:30 PM":
      return 33;
    case "5:00 PM":
      return 34;
    case "5:30 PM":
      return 35;
    case "6:00 PM":
      return 36;
    case "6:30 PM":
      return 37;
    case "7:00 PM":
      return 38;
    case "7:30 PM":
      return 39;
    case "8:00 PM":
      return 40;
    case "8:30 PM":
      return 41;
    case "9:00 PM":
      return 42;
    case "9:30 PM":
      return 43;
    case "10:00 PM":
      return 44;
    case "10:30 PM":
      return 45;
    case "11:00 PM":
      return 46;
    case "11:30 PM":
      return 47;
    default:
      return 0;
  }
};
