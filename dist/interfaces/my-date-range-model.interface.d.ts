import { IMyDate } from "./my-date.interface";
export interface IMyDateRangeModel {
    beginDate: IMyDate;
    beginJsDate: Date;
    endDate: IMyDate;
    endJsDate: Date;
    formatted: string;
    beginEpoc: number;
    endEpoc: number;
}
