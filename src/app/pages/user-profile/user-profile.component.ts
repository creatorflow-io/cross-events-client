import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { WebPushServiceConfiguration } from '../shared/services/web-push-service.configuration';
import { WebPushSubscriptionService } from '../shared/services/web-push-subscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  isSubscribed = false;
  loggedin = false;
  username = '';
  name = '';
  email = '';

  constructor(
    private auth: OAuthService,
    private swPush: SwPush,
    private webPushService: WebPushSubscriptionService,
    private config: WebPushServiceConfiguration,
    private snackBar: MatSnackBar
  ) {
    this.swPush.subscription.subscribe(sub => {
      this.isSubscribed = sub ? true : false;
    });
  }
  
  
  ngOnInit(): void {
    if(this.auth.hasValidIdToken()){
      const claims = this.auth.getIdentityClaims();
      if(claims['preferred_username']){
        this.setValues(claims);
      }else{
        this.auth.loadUserProfile().then(info => {
          var userProfile = info as UserProfile;
          if(userProfile){
            this.setValues(userProfile.info);
          }else{
            console.debug('No user profile', info);
          }
        });
      }
    }
  }

  setValues(claims: any){
    this.username = claims['preferred_username'];
    this.name = claims['name'];
    this.email = claims['email']??'';
    this.loggedin = true;
  }

  logout(){
    this.auth.loadDiscoveryDocument().then(() => {
      this.auth.logOut();
    });
  }

  onSubscriptionsChange(evt: any) {
    console.log("Subscriptions changed", this.isSubscribed);
    if(this.isSubscribed){
      this.subscribeToNotifications();
    }else{
      this.unsubscribeFromNotifications();
    }
  }

  openSnackBar(message: string, action: string = "Close") {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.config.publicKey
    })
    .then(sub => {
      this.webPushService.subscribe(sub)
      .subscribe({
        next: (rs) => {
          this.openSnackBar("Subscribed to notifications.");

        },
        error: (err) => {
          if(err.status == 401 || err.status == 403){
            this.openSnackBar("You are not authorized to perform this action.");
          }else{
            this.openSnackBar("Could not subscribe to notifications. " + err.message);
          }
        }
      });
    })
    .catch(err => {
      console.error("Could not subscribe to notifications", err);
    });
  }

  unsubscribeFromNotifications() {
    this.swPush.subscription
    .subscribe(sub => {
      if(sub){
        sub.unsubscribe();
        this.webPushService.unsubscribe(sub)
        .subscribe({
          next: (rs) => {
            this.openSnackBar("Unsubscribed from notifications.");
          },
          error: (err) => {
            if(err.status == 401 || err.status == 403){
              this.openSnackBar("You are not authorized to perform this action.");
            }else{
              this.openSnackBar("Could not unsubscribe from notifications. " + err.message);
            }
          }
        });
      }
    });
  }
}
export interface UserInfo {
  preferred_username: string;
}
export interface UserProfile {
  info: UserInfo;
}