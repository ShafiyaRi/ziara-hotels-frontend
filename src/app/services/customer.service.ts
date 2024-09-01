import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Customer,CreateCustomerResponse } from '../model/customer.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Contact } from '../model/contact.model';
import { tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 public apiUrl= 'http://localhost:3000';
  refreshGrid$:Subject<boolean> = new Subject<boolean>();

  constructor(  private http:HttpClient) {
   }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/`);
   
  }

  search(customer_id: number): Observable<{ status: boolean; data?: Customer[]; message?: string }> {
    return this.http.get<{ status: boolean; data?: Customer[]; message?: string }>(`/api/search-customer/${customer_id}`);
  }


  addCustomer(customer: Customer): Observable<CreateCustomerResponse> {
    const header = new HttpHeaders({
      'content-Type': 'application/json'
    });
    return this.http.post<CreateCustomerResponse>(`${this.apiUrl}/add-customer`, customer, { headers: header }).pipe(
      tap(()=> this.refreshGrid$.next(true))
    )};


  deleteCustomer(customer: Customer): Observable<CreateCustomerResponse> {
    return this.http.delete<CreateCustomerResponse>(`${this.apiUrl}/delete-customer/${customer.customer_id}`);
  }


  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/update-customer/${customer.customer_id}`, customer).pipe(
      tap(()=>this.refreshGrid$.next(true))
    )};

    getCustomerCount():Observable<CreateCustomerResponse>{
      return this.http.get<CreateCustomerResponse>(`${this.apiUrl}/get-customer-count`).pipe(
        tap(()=>this.refreshGrid$.next(true))
      )
    }
  }