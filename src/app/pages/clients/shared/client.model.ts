import { ClientStatus } from "./client.status";

export interface TcpClient {
    Id: string;
    IpAddress: string;
    Status: ClientStatus;
    CreatedTime: Date;
    LastUpdated: Date;
}