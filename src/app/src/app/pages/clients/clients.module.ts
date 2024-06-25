import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { TranslateModule } from '@ngx-translate/core'
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatMultiSortModule } from 'ngx-mat-multi-sort';
import { ClientsComponent } from './clients.component';
import { ClientServiceConfiguration, ClientServiceConfigurationParams } from './services/service.configuration';
import { ClientSevice } from './services/client.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCommonModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ClientsComponent
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
    TranslateModule
  ],
  exports: [
    ClientsComponent,
    TranslateModule
  ]
})
export class ClientsModule { 

  public static forRoot(environment: ClientServiceConfigurationParams): ModuleWithProviders<ClientsModule> {

    return {
        ngModule: ClientsModule,
        providers: [
            ClientSevice,
            {
                provide: ClientServiceConfiguration,
                useValue: environment
            }
        ]
    };
  }
}
