import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Customer } from '../../model/customer.model';
import { UserFormComponent } from './user-form/user-form.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  customers: Customer[] = [];
  customer_id: Customer | null = null;
  customerToDelete: Customer | undefined;
  customerToUpdate: Customer | null = null;
  searchText: any;

 
  modalRef: BsModalRef | null = null;

  constructor(private customerService: CustomerService,
    private modalService: BsModalService) {

  }
  ngOnInit(): void {
    this.loadCustomers();
    this.customerService.refreshGrid$.subscribe(status=>{
      if(status){
        this.loadCustomers();
      }
    })
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe(
      (resp)=>{
        this.customers = resp
      })
     
  }


  openCustomerAddModal(): void {
   this.modalService.show(UserFormComponent);
  };


  //Delete-done
  openCustomerDeleteModal(customer: Customer): void {
    this.customerToDelete = customer;
    const confirmed = confirm('Are you sure you want to delete this customer?');
    if (confirmed) {
      this.customerService.deleteCustomer(customer).subscribe(
        (resp) => {
          console.log('customer deleted', resp)
          this.customers = this.customers.filter(c => c.customer_id !== this.customerToDelete?.customer_id);
        },
        (error) => {
          console.error('Error deleting customer', error);
        });
    }
  }
  
  openCustomerUpdateModal(customer: Customer): void {
    this.customerToUpdate = customer;
    this.modalRef = this.modalService.show(UserFormComponent, {
        initialState: {
            customer: this.customerToUpdate
        }
    });
}
  
  }

