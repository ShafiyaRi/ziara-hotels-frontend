import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {
  private apiUrl= 'http://localhost:3000';



  constructor(private http:HttpClient,
    private router:Router
  ) { }

  loginAdmin(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap({
          next: (response) => {
            if (response.token) {
              localStorage.setItem('adminToken', response.token);
              this.router.navigate(['/dashboard']);
            } else {
              console.error('No token received:', response);
            }
          },
          error: (error) => {
            console.error('Login failed', error);
          }
        })
      );
  }
  
 
    isAuthenticated(): boolean {
      return !!localStorage.getItem('adminToken'); 
    }  
  canActivate():boolean{
    if(this.isAuthenticated()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
