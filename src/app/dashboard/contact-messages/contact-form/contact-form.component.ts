import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Contact } from '../../../model/contact.model';
import { Booking } from '../../../model/booking.model';

@Component({
  selector: 'app-contact-form',

  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {
contacts:Contact[]=[];
@Input() contact: Contact | null = null;

  contactForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required,Validators.minLength(4)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required,Validators.maxLength(10)]),
    subject: new FormControl(null, [Validators.maxLength(20)]),
    message: new FormControl(null)

})

constructor(private contactService:ContactService,
 public modalref:BsModalRef
  
){

}
ngOnInit(): void {

if (this.contact){
  this.populateContactForm(this.contact);
}
this.getAllContacts();

  }
  getAllContacts(): void {
    this.contactService.getAllContacts().subscribe(
      (contacts) => {
        this.contacts = contacts;
      },
      error => {
        console.error('Error fetching customers', error);
      });
  }
  

  populateContactForm(contact: Contact): void {
    this.contactForm.patchValue({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      subject:contact.subject,
      message:contact.message
    
    })


  }
onContact(){
  if (this.contact) {
    const updatedContact = {
      ...this.contactForm.value,
      contact_id: this.contact.contact_id,
    };
    
    this.contactService.updateContact(updatedContact).subscribe
    ((resp) => {
      console.log(resp);
      if (resp) {
        swal({
          icon: 'success',
          title: 'Booking updated successfully ',
        });
        this.modalref.hide();
      } else {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill in all required fields! ',
        });
      }
      this.modalref.hide();
    });
  } else {
    this.contactService.addContact(this.contactForm.value).subscribe(
      (resp) => {
        console.log(resp);
        if (this.contactForm.valid) {
          swal({
            icon: 'success',
            title: 'Booking Successful ',
            text: 'Welcome to Ziara Hotels!',
          });
          this.modalref.hide();
        } else {
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill in all required fields! ',
          });
        }
        this.modalref.hide();
      },
      (error) => {
        console.error('Error adding Booking', error);
        this.modalref.hide();
      });
  }
}
}