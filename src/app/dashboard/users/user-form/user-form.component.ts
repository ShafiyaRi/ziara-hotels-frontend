import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Customer } from '../../../model/customer.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  @Input() customer: Customer | null = null;
  customers: Customer[] = []
  title: string | null = null;

  userForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    last_name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    gender: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });


  constructor(private customerService: CustomerService,
    public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    if (this.customer) {
      this.populateCustomerForm(this.customer);
    }
    this.getAllCustomers();
  }

  
  getAllCustomers(): void {
    this.customerService.getAllCustomers().subscribe(
      (customers) => {
        this.customers = customers;
      },
      error => {
        console.error('Error fetching customers', error);
      });
  }

  populateCustomerForm(customer: Customer): void {
    this.userForm.patchValue({
      first_name: customer.first_name,
      last_name: customer.last_name,
      gender: customer.gender,
      email: customer.email,
    });
  }

 

  submit() {
    if (this.customer) {
      const updatedCustomer = {
        ...this.userForm.value,
        customer_id: this.customer.customer_id,
      };
      this.customerService.updateCustomer(updatedCustomer).subscribe((resp) => {
        console.log(resp);
        if (resp) {
          swal({
            icon: 'success',
            title: 'Customer updated successfully ',
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
      this.customerService.addCustomer(this.userForm.value).subscribe(
        (resp) => {
          console.log(resp);
          if (this.userForm.valid) {
            swal({
              icon: 'success',
              title: 'Register Successful ',
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
          console.error('Error adding customer', error);
          this.bsModalRef.hide();
        });
    }
  }
}