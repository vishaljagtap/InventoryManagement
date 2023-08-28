import { Component } from '@angular/core';
import { SideNavItem } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  constructor(private api: ApiService){}
  
  sideNavContent: SideNavItem[] = [
    {
      title: 'dashboard',
      link: 'inventory/dashboard',
      needAdmin: false,
    },{
      title: 'view books',
      link: 'books/library',
      needAdmin: false,
    },
    {
      title: 'manage books',
      link: 'books/maintenance',
      needAdmin: true,
    },
    {
      title: 'manage categories',
      link: 'books/categories',
      needAdmin: true,
    },
    {
      title: 'return book',
      link: 'books/return',
      needAdmin: true,
    },
    {
      title: 'view users',
      link: 'users/list',
      needAdmin: true,
    },
    {
      title: 'all orders',
      link: 'users/all-orders',
      needAdmin: true,
    },
    {
      title: 'my orders',
      link: 'users/order',
      needAdmin: false,
    },

  ]

  
  isNormalUser() {
    return this.api.getTokenUserInfo()?.userType === 1 ? true : false;
  }
}
