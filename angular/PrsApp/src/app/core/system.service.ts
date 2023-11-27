import { Injectable } from '@angular/core';
import { User } from '../user/user.class';
import { Router } from '@angular/router';
import { AppInitService } from '../app-init.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  get config() { return this.init.config; }

  loggedInUser: User | null = null;

  constructor(
    private init: AppInitService,
    private router: Router
  ) { }

  loggedIn(): boolean {

    if (this.loggedInUser === null) {
      this.router.navigateByUrl("/login");
      return false;
    }

    return true;
  }
}
