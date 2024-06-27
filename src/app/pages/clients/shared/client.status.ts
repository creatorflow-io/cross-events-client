export enum ClientStatus {
    New, Accepted, Banned
}

export class ClientStatusHelper{
    static getStatusName(status: ClientStatus): string{
        switch(status){
            case ClientStatus.New:
                return 'New';
            case ClientStatus.Accepted:
                return 'Accepted';
            case ClientStatus.Banned:
                return 'Banned';
            default:
                return '';
        }
    }
    static getColor(status: ClientStatus){
        var s = (typeof status == "string" ? ClientStatus[status] : status)  as ClientStatus;
        switch(s){
            case ClientStatus.New:
            return "accent-color";
            case ClientStatus.Accepted:
            return "success-color";
            case ClientStatus.Banned:
            return "warn-color";
            default:
                return "";
        }
    }
}