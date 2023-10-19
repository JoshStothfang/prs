import { Component } from '@angular/core';
import { Vendor } from '../vendor.class';
import { SystemService } from 'src/app/core/system.service';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent {

  vendor: Vendor = new Vendor();

  constructor(
    private sysSvc: SystemService,
    private vendSvc: VendorService,
    private router: Router
  ) { }

  send(): void {
    this.vendSvc.create(this.vendor).subscribe({
      next: (res) => {
        console.debug(res);
        this.router.navigateByUrl("/vendor/list");
      },
      error: (err) => {
        console.error(err);
      }    
    });
  }

  ngOnInit(): void {

    if(!this.sysSvc.loggedIn()) return;
  }
}
