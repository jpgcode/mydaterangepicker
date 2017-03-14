import { IMyDate } from "./my-date.interface";
export interface IMyDateSelected {
    type: number;
    date: IMyDate;
    formatted: string;
    jsdate: Date;
}
