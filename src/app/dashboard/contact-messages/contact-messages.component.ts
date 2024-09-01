import { Component, OnInit,Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Contact } from '../../model/contact.model';
import { ContactService } from '../../services/contact.service';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-contact-messages',
 
  templateUrl: './contact-messages.component.html',
  styleUrl: './contact-messages.component.scss'
})
export class ContactMessagesComponent implements OnInit {
  @Input() contact: Contact | null = null;
contacts : Contact[]=[]
contactToDelete : Contact|null=null;
contactToUpdate: Contact|null=null;
modalref:BsModalRef|null=null;

constructor(private contactService : ContactService,
  public modalService:BsModalService
){

}
ngOnInit():void{
  this.loadContacts();
    this.contactService.refreshGrid$.subscribe(status=>{
      if(status){
        this.loadContacts();
      }
    })
  }
loadContacts(){
  this.contactService.getAllContacts().subscribe(
    (resp)=>{
      this.contacts = resp
    })
}


openContactAddModal(){
  this.modalService.show(ContactFormComponent)

  }

  openContactDeleteModal(contact:Contact){
    this.contactToDelete = contact;
    const confirmed = confirm('Are you sure you want to delete this customer?');
    if (confirmed) {
      this.contactService.deleteContact(contact).subscribe(
        (resp) => {
          console.log('coytact deleted', resp)
          this.contacts = this.contacts.filter(c => c.contact_id !== this.contactToDelete?.contact_id);
        },
        (error) => {
          console.error('Error deleting contact', error);
        });
    }
}

openConactUpdateModal(contact:Contact):void{
this.contactToUpdate = contact;
this.modalref = this.modalService.show(ContactFormComponent,{
    initialState: {
        contact: this.contactToUpdate
    }
});
}

}