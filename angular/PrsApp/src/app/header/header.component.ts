import { Component } from '@angular/core';
import { SystemService } from '../core/system.service';
import { User } from '../user/user.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loggedInUser: User | null = null;

  loaded: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private router: Router
  ) { }

  logout(): void {

    this.sysSvc.loggedInUser = null;
    this.router.navigateByUrl("/login");
  }

  ngOnInit(): void {

    if (this.sysSvc.loggedIn()) {
      this.loggedInUser = this.sysSvc.loggedInUser;
      this.loaded = true;
    }
  }
}
