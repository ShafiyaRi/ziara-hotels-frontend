import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LayoutComponent } from './layout/layout.component';
import { SettingsComponent } from './settings/settings.component';
import { ContactMessagesComponent } from './contact-messages/contact-messages.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
     { path: 'users', component: UsersComponent },
     { path: '', component: BookingDetailsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'contact-messages', component: ContactMessagesComponent }
    ]

    
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,
    
  ]
})
export class DashboardRoutingModule { }
