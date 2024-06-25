import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LayoutModule } from '@juice-js/layout';
import { AuthModule } from '@juice-js/auth';
import { EventsModule } from './src/app/pages/events/events.module';
import { ConfirmDialogComponent } from './src/app/pages/confirm-dialog/confirm-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { WebPushModule } from './src/app/pages/shared/services/web-push.module';
import { CustomUserProfileDialogModule } from './src/app/pages/user-profile/custom-user-profile-dialog.module';
import { ClientsModule } from './src/app/pages/clients/clients.module';

const {auth, production, layout, events} = environment;

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule.forRoot(production, layout),
    CustomUserProfileDialogModule,
    AuthModule.forRoot(auth),
    TranslateModule.forRoot(),
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    EventsModule.forRoot(events),
    ClientsModule.forRoot(events),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    WebPushModule.forRoot(environment.webPush)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

