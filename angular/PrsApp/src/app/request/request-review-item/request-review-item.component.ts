import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/core/system.service';
import { RequestService } from '../request.service';
import { Request } from '../request.class';

@Component({
  selector: 'app-request-review-item',
  templateUrl: './request-review-item.component.html',
  styleUrls: ['./request-review-item.component.css']
})
export class RequestReviewItemComponent {

  request: Request | null = null;

  loaded: boolean = false;

  rejectToggled: boolean = false;

  rejectionReason: string = "";

  constructor(
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private reqSvc: RequestService,
    private router: Router
  ) { }

  approve(): void {

    this.reqSvc.approve(this.request!).subscribe({
      next: (res) => {
        console.debug(res);
        this.router.navigateByUrl("/request/review");
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  toggleReject(): void {
    this.rejectToggled = !this.rejectToggled;
  }

  reject(): void {

    if (this.rejectionReason === "") return;

    this.request!.rejectionReason = this.rejectionReason;

    this.reqSvc.reject(this.request!).subscribe({
      next: (res) => {
        console.debug(res);
        this.router.navigateByUrl("/request/review");
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
        if (this.sysSvc.loggedInUser!.id === res.userId || res.status !== "REVIEW") {
          this.router.navigateByUrl("/request/review");
          return;
        }
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
