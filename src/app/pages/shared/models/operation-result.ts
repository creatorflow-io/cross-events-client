export interface OperationResult{
    Succeeded: boolean;
    Message: string;
}

export class OperationResultImpl implements OperationResult{
    Succeeded: boolean = false;
    Message: string ="";
}