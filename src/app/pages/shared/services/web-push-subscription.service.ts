import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebPushServiceConfiguration } from './web-push-service.configuration';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
    providedIn: 'root'
  })
export class WebPushSubscriptionService {
  constructor(private auth: OAuthService,
    private http: HttpClient, private config: WebPushServiceConfiguration) {

  }

  subscribe(subscription: PushSubscription): Observable<any> {
    if(this.auth.hasValidAccessToken()){
      var username = this.auth.getIdentityClaims()['preferred_username'];
      return this.http.post(this.config.apiEndpoint + `/push-notifications-api/${username}/subscription`, subscription);
    }
    throw new Error('No valid access token');
  }

  unsubscribe(subscription: PushSubscription): Observable<any> {
    if(this.auth.hasValidAccessToken()){
      var username = this.auth.getIdentityClaims()['preferred_username'];
      return this.http.delete(this.config.apiEndpoint + `/push-notifications-api/${username}/subscription`, { params: new HttpParams().set('endpoint', subscription.endpoint) });
    }
    throw new Error('No valid access token');
  }
}