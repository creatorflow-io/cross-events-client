import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { TranslateModule } from '@ngx-translate/core'
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatMultiSortModule } from 'ngx-mat-multi-sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCommonModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ServiceConfigurationParams } from './shared/service.configuration';
import { UserService } from './users/services/user.service';
import { RoleService } from './roles/services/role.service';
import { IdentityConfiguration } from './users/services/identity.configuration';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { RoleUpdateComponent } from './roles/role-update/role-update.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RoleCreateComponent } from './roles/role-create/role-create.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { UserRoleAsignComponent } from './users/user-role-asign/user-role-asign.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserRoleAsignComponent,
    UserDetailComponent,
    RoleUpdateComponent,
    RoleCreateComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ClipboardModule,
    MatMultiSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatListModule,
    TranslateModule
  ],
  exports: [
    UsersComponent,
    UserCreateComponent,
    UserUpdateComponent,
    UserRoleAsignComponent,
    UserDetailComponent,
    RolesComponent,
    RoleUpdateComponent,
    RoleCreateComponent,
    TranslateModule
  ]
})
export class IdentityModule { 

  public static forRoot(environment: ServiceConfigurationParams): ModuleWithProviders<IdentityModule> {

    return {
        ngModule: IdentityModule,
        providers: [
            UserService,
            RoleService,
            {
                provide: IdentityConfiguration,
                useValue: environment
            }
        ]
    };
  }
}
