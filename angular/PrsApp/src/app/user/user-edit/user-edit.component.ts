import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/core/system.service';
import { UserService } from '../user.service';
import { User } from '../user.class';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {

  user: User | null = null;

  loaded: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private userSvc: UserService,
    private router: Router
  ) { }

  send(): void {

    this.userSvc.change(this.user!).subscribe({
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

    let id = this.route.snapshot.params["id"];
    this.userSvc.get(id).subscribe({
      next: (res) => {
        console.debug(res);
        this.user = res;
        this.loaded = true;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
