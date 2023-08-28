import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public api: ApiService, private router: Router){
    if(!this.api.isLoggedIn()){
      this.router.navigateByUrl('/login');
    }
  }

}
