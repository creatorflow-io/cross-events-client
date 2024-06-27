import { EventStatus } from "./event.status";

export interface TcpEvent {
    Id: string;
    Timestamp: Date;
    Status: EventStatus;
    Message: string;
    ProcessedTime: Date;
    ProcessedBy: string;
}