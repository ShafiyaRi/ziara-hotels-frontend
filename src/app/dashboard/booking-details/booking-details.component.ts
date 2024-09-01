import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { Booking, CreateBookingresponse } from '../../model/booking.model';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { response } from 'express';
import { CustomerService } from '../../services/customer.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.scss',
})
export class BookingDetailsComponent implements OnInit {
  bookings: Booking[] = [];
  bookingToDelete: Booking | null = null;
  bookingToUpdate: Booking | null = null;
  modalRef: BsModalRef | null = null;
  bookingCount: number | null = null;
  customerCount: number | null = null;
  contactCount: number | null = null;

  constructor(
    private bookingService: BookingsService,
    private customerService: CustomerService,
    private contactService: ContactService,
    public modalService: BsModalService
  ) {}
  ngOnInit(): void {
    this.loadBookings();
    this.bookingService.refreshGrid$.subscribe((status) => {
      if (status) {
        this.loadBookings();
      }
    });

    this.loadBookingCount();
    this.bookingService.refreshGrid$.subscribe((status) => {
      if (status) {
        this.loadBookingCount();
      }
    });

    this.loadCustomerCount();
    this.customerService.refreshGrid$.subscribe((status) => {
      if (status) {
        this.loadCustomerCount();
      }
    });
  
  this.loadContactCount();
  this.contactService.refreshGrid$.subscribe((status) => {
    if (status) {
      this.loadContactCount();
    }
  });
}

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe((resp) => {
      this.bookings = resp;
    });
  }

  loadBookingCount(): void {
    this.bookingService.getBookingCount().subscribe(
      (response) => {
        this.bookingCount = response.bookingCount;
      },
      (error) => {
        console.error('error fetching booking count', error);
      }
    );
  }
  loadCustomerCount(): void {
    this.customerService.getCustomerCount().subscribe(
      (response) => {
        this.customerCount = response.customerCount;
      },
      (error) => {
        console.error('error fetching customer count', error);
      }
    );
  }
  loadContactCount(): void {
    this.contactService.getContactCount().subscribe(
      (response) => {
        this.contactCount = response.contactCount;
      },
      (error) => {
        console.error('error fetching contact count', error);
      }
    );
  }

  openBookingAddModal(): void {
    this.modalService.show(BookingFormComponent);
  }

  openBookingDeleteModal(booking: Booking) {
    this.bookingToDelete = booking;
    const confirmed = confirm('Are you sure you want to delete this customer?');
    if (confirmed) {
      this.bookingService.deleteBooking(booking).subscribe(
        (resp) => {
          console.log('customer deleted', resp);
          this.bookings = this.bookings.filter(
            (c) => c.booking_id !== this.bookingToDelete?.booking_id
          );
        },
        (error) => {
          console.error('Error deleting customer', error);
        }
      );
    }
  }

  openBookingUpdateModal(booking: Booking): void {
    this.bookingToUpdate = booking;
    this.modalRef = this.modalService.show(BookingFormComponent, {
      initialState: {
        booking: this.bookingToUpdate,
      },
    });
  }
}
