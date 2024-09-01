import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import swal from 'sweetalert'
import { MatSnackBar } from '@angular/material/snack-bar';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, CommonModule, ReactiveFormsModule,LottieComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    gender: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });
  Options : AnimationOptions = {
    path: '/assets/signup-anima.json',  
    autoplay: true,
    loop: true,
  };


  constructor(private customerService: CustomerService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.customerService.addCustomer(this.registerForm.value).subscribe(
        (resp) => {
          console.log('Customer added', resp);
        }),
        
        console.log(this.registerForm.value);
      const isFormValid = this.registerForm.valid;

      if (isFormValid) {
        swal({
          icon: 'success',
          title: 'Register Successful ',
          text: 'Welcome to Ziara Hotels!',
        });
        this.registerForm.reset();

      } else {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all required fields! ',
        });
        this.registerForm.reset();
      }
    } else {
      alert('Invalid data')
    }
  }
};
   




