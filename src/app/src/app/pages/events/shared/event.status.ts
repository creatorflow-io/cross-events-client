export enum EventStatus {
    New, Processed, Abandoned
}

export class EventStatusHelper{
    static getStatusName(status: EventStatus): string{
        switch(status){
            case EventStatus.New:
                return 'New';
            case EventStatus.Processed:
                return 'Processed';
            case EventStatus.Abandoned:
                return 'Abandoned';
            default:
                return '';
        }
    }
    static getColor(status: EventStatus){
        var s = (typeof status == "string" ? EventStatus[status] : status)  as EventStatus;
        switch(s){
            case EventStatus.New:
            return "accent-color";
            case EventStatus.Processed:
            return "success-color";
            case EventStatus.Abandoned:
            return "warn-color";
            default:
                return "";
        }
    }
}