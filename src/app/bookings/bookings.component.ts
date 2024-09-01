import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup,FormControl,Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Booking } from '../model/booking.model';
import { BookingsService } from '../services/bookings.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent implements OnInit{
 bookings: Booking[]=[]

  bookingForm: FormGroup= new FormGroup({
    name: new FormControl(null,[Validators.required] ),
    email: new FormControl(null,[Validators.required]),
    phone: new FormControl(null,[Validators.required]),
    number_of_rooms:new FormControl(null,[Validators.required]),
    arrival_date: new FormControl(null,[Validators.required]),
    number_of_guests:new FormControl(null,[Validators.required])
  })

  constructor( private bookingService: BookingsService){

  }
  ngOnInit(): void {
    
    
  }
  onBooking(){
    if (this.bookingForm.valid) {
      this.bookingService.addBooking(this.bookingForm.value).subscribe(
        (resp) => {
          console.log('Booking', resp);
          swal({
            icon: 'success',
            title: 'Booking confirmed',
            text: 'Welcome to Ziara Hotels!',
          });
        }),
        
        console.log(this.bookingForm.value);
      const isFormValid = this.bookingForm.valid;
      this.bookingForm.reset()
      } else {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all required fields! ',
        });
    }
  this.bookingForm.reset();
  }
}



