import { Component } from '@angular/core';
import { SystemService } from 'src/app/core/system.service';
import { Request } from '../request.class';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent {

  request: Request = new Request();

  constructor(
    private sysSvc: SystemService,
    private reqSvc: RequestService,
    private router: Router
  ) { }

  send(): void {
    
    this.reqSvc.create(this.request).subscribe({
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

    this.request.userId = this.sysSvc.loggedInUser!.id;
  }
}
