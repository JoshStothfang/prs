import { Component } from '@angular/core';
import { Vendor } from '../vendor.class';
import { SystemService } from 'src/app/core/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent {

  vendor: Vendor | null = null;

  loaded: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private vendSvc: VendorService,
    private router: Router
  ) { }

  send(): void {

    this.vendSvc.change(this.vendor!).subscribe({
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

    let id = this.route.snapshot.params["id"];
    this.vendSvc.get(id).subscribe({
      next: (res) => {
        console.debug(res);
        this.vendor = res;
        this.loaded = true;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
