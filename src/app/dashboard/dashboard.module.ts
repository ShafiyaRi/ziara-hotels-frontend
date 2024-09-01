import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { provideHttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { MaterialModule } from '../../_module/Material_module';
import { UsersComponent } from './users/users.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { ContactMessagesComponent } from './contact-messages/contact-messages.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { BookingFormComponent } from './booking-details/booking-form/booking-form.component';
import { ContactFormComponent } from './contact-messages/contact-form/contact-form.component';

@NgModule({
  declarations: [
    LayoutComponent,
    UsersComponent,
    UserFormComponent,
    BookingDetailsComponent,
    BookingFormComponent,
    SettingsComponent,
    ContactMessagesComponent,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    
    
  ],
  providers: [provideHttpClient(), BsModalService],
  bootstrap: [LayoutComponent],
})
export class DashboardModule {}
