import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@juice-js/auth';
import { PageComponent } from '@juice-js/layout';
import { EventsComponent } from './pages/events/events.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { UsersComponent } from './pages/users/users.component';
import { RolesComponent } from './pages/roles/roles.component';

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
              menuIcon: 'show_chart',
              menuTitle: 'Events',
            },
            canActivate: [AuthGuard],
            component: EventsComponent
          },
          {
            path:'clients',
            data:{
              menuDisplay: true,
              menuIcon: 'devices',
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
          },
          {
            path:'users',
            data:{
              menuDisplay: true,
              menuIcon: 'supervisor_account',
              menuTitle: 'Users',
            },
            canActivate: [AuthGuard],
            component: UsersComponent
          },
          {
            path:'roles',
            data:{
              menuDisplay: true,
              menuIcon: 'verified_user',
              menuTitle: 'Roles',
            },
            canActivate: [AuthGuard],
            component: RolesComponent
          }
        ]
      }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }