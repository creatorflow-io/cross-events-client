export class WebPushServiceConfiguration{
    apiEndpoint: string = "";
    publicKey: string = "";
}

export interface WebPushServiceConfigurationParams{
    apiEndpoint?: string;
    publicKey?: string;
}