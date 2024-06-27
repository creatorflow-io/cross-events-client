import { NgModule } from '@angular/core';
import { UserProfileComponent } from './user-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProfileDialogService } from '@juice-js/layout';
import { CustomUserProfileDialogService } from './user-profile-dialog.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatInputModule,
    FormsModule,
    TranslateModule.forChild(),
    CommonModule
  ],
  exports: [
  ],
  providers: [
    {
      provide: ProfileDialogService,
      useClass: CustomUserProfileDialogService
    }
  ]
})
export class CustomUserProfileDialogModule {
}
