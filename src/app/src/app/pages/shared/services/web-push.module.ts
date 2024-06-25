import { NgModule, ModuleWithProviders } from '@angular/core';
import { WebPushServiceConfiguration, WebPushServiceConfigurationParams } from './web-push-service.configuration';
import { WebPushSubscriptionService } from './web-push-subscription.service';

@NgModule({

})
export class WebPushModule { 

  public static forRoot(environment: WebPushServiceConfigurationParams): ModuleWithProviders<WebPushModule> {

    return {
        ngModule: WebPushModule,
        providers: [
            WebPushSubscriptionService,
            {
                provide: WebPushServiceConfiguration,
                useValue: environment
            }
        ]
    };
  }
}
