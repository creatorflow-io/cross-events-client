import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { TranslateModule } from '@ngx-translate/core'
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatMultiSortModule } from 'ngx-mat-multi-sort';
import { EventsComponent } from './events.component';
import { EventServiceConfiguration, EventServiceConfigurationParams } from './services/service.configuration';
import { EventService } from './services/event.service';
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
    EventsComponent
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
    EventsComponent,
    TranslateModule
  ]
})
export class EventsModule { 

  public static forRoot(environment: EventServiceConfigurationParams): ModuleWithProviders<EventsModule> {

    return {
        ngModule: EventsModule,
        providers: [
            EventService,
            {
                provide: EventServiceConfiguration,
                useValue: environment
            }
        ]
    };
  }
}
