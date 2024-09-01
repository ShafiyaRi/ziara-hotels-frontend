import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {  RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  //modalRef: BsModalRef<RegisterComponent> | null = null;

//constructor(public modalService: BsModalService) {}

///openRegisterModal() {
 // this.modalService.show(RegisterComponent, {
 // });
}
