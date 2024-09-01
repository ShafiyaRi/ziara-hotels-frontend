import { Component,OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [HeaderComponent,FooterComponent, CommonModule,ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit {
 
    contactForm: FormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required,Validators.minLength(4)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required,Validators.maxLength(10)]),
      subject: new FormControl(null, [Validators.maxLength(20)]),
      message: new FormControl(null)
  
    })
  constructor(private contactService:ContactService){
  }
  ngOnInit(){
  }
  
  onContact(){ 
    if (this.contactForm.valid) {
      this.contactService.addContact(this.contactForm.value).subscribe(
        (resp) => {
          console.log('Message added', resp);
          alert('message sent successfully')
        }),
        
        console.log(this.contactForm.value);
      const isFormValid = this.contactForm.valid;
      this.contactForm.reset()
      } else {
      alert('Invalid data')
    }
  this.contactForm.reset();
  }
  };
   
  
  
