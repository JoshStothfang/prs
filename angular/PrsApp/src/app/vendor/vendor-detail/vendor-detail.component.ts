import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/core/system.service';
import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor.class';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent {

  vendor: Vendor | null = null;

  loaded: boolean = false;

  removeToggled: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private vendSvc: VendorService,
    private router: Router
  ) { }

  toggleRemove(): void {
    this.removeToggled = !this.removeToggled;
  }

  remove(): void {
    this.vendSvc.remove(this.vendor!.id).subscribe({
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

    let id: number = this.route.snapshot.params["id"];
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
