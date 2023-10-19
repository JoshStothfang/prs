import { Component } from '@angular/core';
import { User } from '../user.class';
import { SystemService } from 'src/app/core/system.service';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  user: User | null = null;

  loaded: boolean = false;

  removeToggled: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private userSvc: UserService,
    private router: Router
  ) { }

  toggleRemove(): void {
    this.removeToggled = !this.removeToggled;
  }

  remove(): void {
    this.userSvc.remove(this.user!.id).subscribe({
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

    let id: number = this.route.snapshot.params["id"];
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
