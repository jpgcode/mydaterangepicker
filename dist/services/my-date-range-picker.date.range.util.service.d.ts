import { IMyDateRange } from "../interfaces/my-date-range.interface";
import { IMyMonthLabels } from "../interfaces/my-month-labels.interface";
import { IMyDate } from "../interfaces/my-date.interface";
import { IMyMonth } from "../interfaces/my-month.interface";
export declare class DateRangeUtilService {
    isDateRangeValid(daterange: string, dateFormat: string, minYear: number, maxYear: number, disableUntil: IMyDate, disableSince: IMyDate, monthLabels: IMyMonthLabels): IMyDateRange;
    isMonthLabelValid(monthLabel: string, monthLabels: IMyMonthLabels): number;
    isYearLabelValid(yearLabel: number, minYear: number, maxYear: number): number;
    parseDatePartNumber(dateFormat: string, dateString: string, datePart: string): number;
    parseDatePartMonthName(dateFormat: string, dateString: string, datePart: string, monthLabels: IMyMonthLabels): number;
    parseDefaultMonth(monthString: string): IMyMonth;
    isDisabledDay(date: IMyDate, disableUntil: IMyDate, disableSince: IMyDate, preventBefore: IMyDate, preventAfter: IMyDate): boolean;
    isMonthDisabledByDisableUntil(date: IMyDate, disableUntil: IMyDate): boolean;
    isMonthDisabledByDisableSince(date: IMyDate, disableSince: IMyDate): boolean;
    isInitializedDate(date: IMyDate): boolean;
    getTimeInMilliseconds(date: IMyDate): number;
    getWeekNumber(date: IMyDate): number;
    private isDateValid(date, dateFormat, minYear, maxYear, monthLabels, isMonthStr);
}
