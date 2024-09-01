import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isSidebarCollapsed=false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
}


  constructor(private router: Router) {}

  showLogoutMessage(): void {
    const result = confirm('Do you want to logout?');
    if (result) { 
      console.log('User wants to logout.') ;
      this.router.navigate (['/homepage']);

    } else {
      console.log('User does not want to logout.');
    }
  }

}



