import { Injectable } from '@angular/core';
import { User } from '../user/user.class';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  
  loggedInUser: User | null = null;

  constructor(
    private router: Router
  ) { 
    
    //temporary loggedInUser for testing purposes
    this.loggedInUser = new User();
    this.loggedInUser.id = 1;
    this.loggedInUser.username = "admin";
    this.loggedInUser.password = "Password123";
    this.loggedInUser.firstname = "John";
    this.loggedInUser.lastname = "Doe";
    this.loggedInUser.isReviewer = true;
    this.loggedInUser.isAdmin = true;
  }

  loggedIn(): boolean {

    if (this.loggedInUser === null) {
      this.router.navigateByUrl("/login");
      return false;
    }

    return true;
  }
}
