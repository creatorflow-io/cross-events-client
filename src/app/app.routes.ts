import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@juice-js/auth';
import { PageComponent } from '@juice-js/layout';
import { EventsComponent } from './src/app/pages/events/events.component';
import { ClientsComponent } from './src/app/pages/clients/clients.component';

export const routes: Routes = [
    {
        path:'',
        component: PageComponent,
        data:{
          menuDisplay: true,
          menuIcon: 'admin_panel_settings',
          menuTitle: 'System',
          menuOrder: 1,
          settingUrl: '/' // /settings
        },
        children:[
          {
            path:'events',
            data:{
              menuDisplay: true,
              menuIcon: 'business',
              menuTitle: 'Events',
            },
            canActivate: [AuthGuard],
            component: EventsComponent
          },
          {
            path:'clients',
            data:{
              menuDisplay: true,
              menuIcon: 'business',
              menuTitle: 'Clients',
            },
            canActivate: [AuthGuard],
            component: ClientsComponent
          }
        ]
      },
      {
        path:'',
        component: PageComponent,
        data:{
          menuDisplay: true,
          menuIcon: 'security',
          menuTitle: 'Security',
          menuOrder: 9
        },
        children:[
          {
            path:'auth',
            data:{
              menuDisplay: true
            },
            loadChildren: () => import('@juice-js/auth').then(m =>{
              return m.AuthRoutingModule;
            })
          }
        ]
      }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }