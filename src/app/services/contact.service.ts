import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact, CreateContactRespone } from '../model/contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public apiUrl = 'http://localhost:3000';
  refreshGrid$: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/contact-details`);
  }

  addContact(contact: Contact): Observable<CreateContactRespone> {
    const header = new HttpHeaders({
      'content-Type': 'application/json',
    });
    return this.http.post<CreateContactRespone>(
      `${this.apiUrl}/add-contact`,
      contact,
      { headers: header }
    );
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http
      .put<Contact>(
        `${this.apiUrl}/update-contact/${contact.contact_id}`,
        contact
      )
      .pipe(tap(() => this.refreshGrid$.next(true)));
  }
  getContactCount(): Observable<CreateContactRespone> {
    return this.http
      .get<CreateContactRespone>(
        `${this.apiUrl}/get-contact-count`
      )
      .pipe(tap(() => this.refreshGrid$.next(true)));
  }
  deleteContact(contact: Contact): Observable<CreateContactRespone> {
    return this.http.delete<CreateContactRespone>(
      `${this.apiUrl}/delete-contact/${contact.contact_id}`
    );
  }
}
