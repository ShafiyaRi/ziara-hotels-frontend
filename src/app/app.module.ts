import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import player from 'lottie-web';
import { BookingsComponent } from './bookings/bookings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'bookings',component:BookingsComponent}
];
export function playerFactory() {
  return player;
}


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HomepageComponent,
    ContactUsComponent,
    RegisterComponent,
    LoginComponent,
    BookingsComponent,
    FontAwesomeModule,
    ReactiveFormsModule

  ],

  
  providers: [provideHttpClient(withFetch())],
})
export class AppModule { }
