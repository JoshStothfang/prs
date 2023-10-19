import { Component } from '@angular/core';
import { Request } from '../request.class';
import { SystemService } from 'src/app/core/system.service';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent {

  requests: Request[] = [];

  loaded: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private reqSvc: RequestService
  ) { }

  ngOnInit(): void {

    if (!this.sysSvc.loggedIn()) return;

    this.reqSvc.list().subscribe({
      next: (res) => {
        console.debug(res);
        this.requests = res;
        this.loaded = true;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
