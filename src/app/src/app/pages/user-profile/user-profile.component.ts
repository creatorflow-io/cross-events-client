import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { WebPushServiceConfiguration } from '../shared/services/web-push-service.configuration';
import { WebPushSubscriptionService } from '../shared/services/web-push-subscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  isSubscribed = false;

  constructor(
    private swPush: SwPush,
    private webPushService: WebPushSubscriptionService,
    private config: WebPushServiceConfiguration,
    private snackBar: MatSnackBar
  ) {
    this.swPush.subscription.subscribe(sub => {
      this.isSubscribed = sub ? true : false;
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
