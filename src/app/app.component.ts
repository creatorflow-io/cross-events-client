import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Events management';

  constructor(private auth: OAuthService){

  }
}
