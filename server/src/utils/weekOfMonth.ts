import { DateTime } from "luxon";
export const weekOfMonth = () => {
    const date = DateTime.now();
    const dayDate = date.day;
    const dayWeek = date.weekday;

    // returns the week of the month from 1 - 6
    return Math.ceil((dayDate + 6 - dayWeek) / 7);
};
