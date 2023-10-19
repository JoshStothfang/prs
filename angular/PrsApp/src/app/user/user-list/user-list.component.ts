import { Component } from '@angular/core';
import { User } from '../user.class';
import { SystemService } from 'src/app/core/system.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  users: User[] = [];

  loaded: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private userSvc: UserService
  ) { }

  ngOnInit(): void {

    if (!this.sysSvc.loggedIn()) return;

    this.userSvc.list().subscribe({
      next: (res) => {
        console.debug(res);
        this.users = res;
        this.loaded = true;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
