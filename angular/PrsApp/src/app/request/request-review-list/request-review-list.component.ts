import { Component } from '@angular/core';
import { SystemService } from 'src/app/core/system.service';
import { Request } from '../request.class';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-review-list',
  templateUrl: './request-review-list.component.html',
  styleUrls: ['./request-review-list.component.css']
})
export class RequestReviewListComponent {

  requests: Request[] = [];

  loaded: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private reqSvc: RequestService
  ) { }

  ngOnInit(): void {

    if (!this.sysSvc.loggedIn()) return;

    this.reqSvc.reviews(this.sysSvc.loggedInUser!.id).subscribe({
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
