import { Component } from '@angular/core';
import { Request } from '../request.class';
import { SystemService } from 'src/app/core/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { RequestLineService } from 'src/app/request-line/request-line.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent {

  request: Request | null = null;

  loaded: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private reqSvc: RequestService,
    private router: Router
  ) { }

  send(): void {

    this.reqSvc.change(this.request!).subscribe({
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
