import { Component,Input, OnInit } from '@angular/core';
import { BookingsService } from '../../../services/bookings.service';
import { Booking } from '../../../model/booking.model';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent implements OnInit {
  bookings:Booking[]=[];
  @Input() booking: Booking | null = null;



  bookingForm:FormGroup =new FormGroup ({
    name: new FormControl(null,[]),
    email:new FormControl(null,[]),
    phone :new FormControl(null,[]),
    number_of_rooms:new FormControl(null,[]),
    number_of_guests:new FormControl(null,[]),
    arrival_date: new FormControl(null,[])
  })

  constructor(private bookingService:BookingsService,
    public bsModalRef : BsModalRef
  ){

  }

  ngOnInit():void{
    console.log('Booking passed to the form:', this.booking);
if (this.booking){
  this.populateBookingsForm(this.booking);
  
}
this.getAllBookings();

  }
  getAllBookings(): void {
    this.bookingService.getAllBookings().subscribe(
      (bookings) => {
        this.bookings = bookings;
      },
      error => {
        console.error('Error fetching customers', error);
      });
  }
  

  populateBookingsForm(booking: Booking): void {
    const formattedDate = new Date(booking.arrival_date).toISOString().substring(0, 10);
  
    this.bookingForm.patchValue({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      number_of_rooms: booking.number_of_rooms,
      number_of_guests: booking.number_of_guests,
      arrival_date: formattedDate, 
    })


    }
onBooking(){
  if (this.booking) {
    const updatedBooking = {
      ...this.bookingForm.value,
      booking_id: this.booking.booking_id,
    };
    this.bookingService.updateBooking(updatedBooking).subscribe
    ((resp) => {
      console.log(resp);
      if (resp) {
        swal({
          icon: 'success',
          title: 'Booking updated successfully ',
        });
        this.bsModalRef.hide();
      } else {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all required fields! ',
        });
      }
      this.bsModalRef.hide();
    });
  } else {
    this.bookingService.addBooking(this.bookingForm.value).subscribe(
      (resp) => {
        console.log(resp);
        if (this.bookingForm.valid) {
          swal({
            icon: 'success',
            title: 'Booking Successful ',
            text: 'Welcome to Ziara Hotels!',
          });
          this.bsModalRef.hide();
        } else {
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill in all required fields! ',
          });
        }
        this.bsModalRef.hide();
      },
      (error) => {
        console.error('Error adding Booking', error);
        this.bsModalRef.hide();
      });
  }
}
}