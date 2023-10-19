import { Component } from '@angular/core';
import { SystemService } from 'src/app/core/system.service';
import { User } from '../user.class';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {

  user: User = new User();

  constructor(
    private sysSvc: SystemService,
    private userSvc: UserService,
    private router: Router
  ) { }
  
  send(): void {
    this.userSvc.create(this.user).subscribe({
      next: (res) => {
        console.debug(res);
        this.router.navigateByUrl("/user/list");
      },
      error: (err) => {
        console.error(err);
      }    
    });
  }

  ngOnInit(): void {

    if(!this.sysSvc.loggedIn()) return;
  }
}
