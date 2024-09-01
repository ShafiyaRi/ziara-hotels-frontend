import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import {
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    LottieComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMessage: string | null = null;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  LoginOptions: AnimationOptions = {
    path: '/assets/login-anima.json',
    autoplay: true,
    loop: true,
  };

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.loginAdmin(email, password).subscribe({
        next: (response) => {
          if (response.token) {
            localStorage.setItem('adminToken', response.token);
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Login failed: Invalid token';
          }
        },
        error: (err) => {
          console.error('Login failed', err);
          this.errorMessage = 'Login failed: Invalid credentials or server error';
        },
      });
    }
  
  }
}
