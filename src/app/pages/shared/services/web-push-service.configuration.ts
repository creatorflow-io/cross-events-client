import { ServiceConfiguration, ServiceConfigurationParams } from "../service.configuration";

export class WebPushServiceConfiguration extends ServiceConfiguration{
    publicKey: string = "";
}

export interface WebPushServiceConfigurationParams extends ServiceConfigurationParams{
    publicKey?: string;
}