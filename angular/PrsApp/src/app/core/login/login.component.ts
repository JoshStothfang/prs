import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { SystemService } from '../system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = "";

  password: string = "";

  incorrect: boolean = false;

  constructor(
    private userSvc: UserService,
    private sysSvc: SystemService,
    private router: Router
  ) { }

  send(): void {

    this.userSvc.login(this.username, this.password).subscribe({
      next: (res) => {
        console.debug(res);
        this.sysSvc.loggedInUser = res;
        this.router.navigateByUrl("/request/list");
      },
      error: (err) => {
        console.error(err);
        this.incorrect = true;
        this.username = "";
        this.password = "";
        document.getElementById("username")!.focus();
      }
    });
  }
}
