import { Component } from '@angular/core';
import { Request } from '../request.class';
import { SystemService } from 'src/app/core/system.service';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../request.service';
import { RequestLineService } from 'src/app/request-line/request-line.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent {

  id: number = 0;

  request: Request | null = null;

  loaded: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private reqSvc: RequestService,
    private reqLineSvc: RequestLineService
  ) { }

  removeReqLine(id: number): void {

    this.reqLineSvc.remove(id).subscribe({
      next: (res) => {
        console.debug(res);
        this.refresh();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {

    if (!this.sysSvc.loggedIn()) return;

    this.id = this.route.snapshot.params["id"];

    this.refresh();
  }

  refresh(): void {

    this.loaded = false;

    this.reqSvc.get(this.id).subscribe({
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
