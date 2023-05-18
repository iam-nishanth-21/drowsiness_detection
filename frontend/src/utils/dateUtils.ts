import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
import duration from "dayjs/plugin/duration";
dayjs.extend(isBetween);
dayjs.extend(relativeTime);
dayjs.extend(duration);
export const calendarTimeFormat = "H:mm";
export const customFormat = "#ssSSSMMDD";
export const displayFormat = "MM ddd, YYYY h:mm A";

export const transformToCustomFormat = (date: string) => {
  return dayjs(date).format(customFormat);
};
export const convertToDayJS = (date: string | null) => {
  return date ? dayjs(date) : null;
};

export const calendarToMomentFormat = (time: string) => {
  return dayjs(time, calendarTimeFormat);
};

export const parseTimeToMoment = (time: string) => {
  return dayjs(time, calendarTimeFormat);
};

export const convertToInclusiveTimeForTimePicker = (time: string) => {
  return time === "24:00" ? "23:59" : time;
};

export const momentToSlotFormat = (time: dayjs.Dayjs) => {
  return time
    ? time.format(calendarTimeFormat).toString() === "23:59"
      ? "24:00"
      : time.format(calendarTimeFormat).toString()
    : null;
};

export const getTodaysStart = () => {
  return dayjs().startOf("day");
};
export const minutesToMoment = (time: number) => {
  return getTodaysStart().add(time, "minutes");
};

export const displayDateFormat = (date: string | null) => {
  return date ? dayjs(date).format(displayFormat) : "";
};

export const getMinutes = (time: dayjs.Dayjs) => {
  return time ? time.diff(dayjs().startOf("day"), "minute") : 0;
};
