import { Component } from '@angular/core';
import { Request } from '../request.class';
import { SystemService } from 'src/app/core/system.service';
import { RequestService } from '../request.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent {

  request: Request | null = null;

  loaded: boolean = false;

  removeToggled: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private reqSvc: RequestService,
    private router: Router
  ) { }

  toggleRemove(): void {
    this.removeToggled = !this.removeToggled;
  }

  remove(): void {
    this.reqSvc.remove(this.request!.id).subscribe({
      next: (res) => {
        console.debug(res);
        this.router.navigateByUrl("/request/list");
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {

    if (!this.sysSvc.loggedIn()) return;

    let id = this.route.snapshot.params["id"];
    this.reqSvc.get(id).subscribe({
      next: (res) => {
        console.debug(res);
        this.request = res;
        this.loaded = true;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
