import { Injectable } from '@angular/core';
import { Booking, CreateBookingresponse } from '../model/booking.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private apiUrl= 'http://localhost:3000';
  refreshGrid$:Subject<boolean> = new Subject<boolean>();

  
  constructor(public http:HttpClient) { }


  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/booking-details`);
  }

  addBooking(booking: Booking): Observable<CreateBookingresponse> {
    const header = new HttpHeaders({
      'content-Type': 'application/json'
    });
    return this.http.post<CreateBookingresponse>(`${this.apiUrl}/add-booking`, booking, { headers: header }).pipe(
    tap(()=> this.refreshGrid$.next(true))
  )}

  updateBooking(booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/update-booking/${booking.booking_id}`, booking).pipe(
      tap(()=>this.refreshGrid$.next(true))
    )};

    
  deleteBooking(booking: Booking): Observable<CreateBookingresponse> {
    return this.http.delete<CreateBookingresponse>(`${this.apiUrl}/delete-booking/${booking.booking_id}`)
  }


  getBookingCount():Observable<CreateBookingresponse>{
    return this.http.get<CreateBookingresponse>(`${this.apiUrl}/get-booking-count`).pipe(
      tap(()=>this.refreshGrid$.next(true))
    )
  }


  
}

