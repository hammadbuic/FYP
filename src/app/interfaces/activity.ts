import { Coordinator } from "./coordinator";

export interface Activity {
    id?:Number,
    Title:string,
    Description:string,
    DueDate:Date,
    FileName:string,
    FileType:string,
    branch:string,
    coordinatorId:string,
    coordinator:Coordinator
}