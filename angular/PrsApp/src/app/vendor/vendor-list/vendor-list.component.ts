import { Component } from '@angular/core';
import { Vendor } from '../vendor.class';
import { SystemService } from 'src/app/core/system.service';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent {

  vendors: Vendor[] = [];

  loaded: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private vendSvc: VendorService
  ) { }

  ngOnInit(): void {

    if (!this.sysSvc.loggedIn()) return;

    this.vendSvc.list().subscribe({
      next: (res) => {
        console.debug(res);
        this.vendors = res;
        this.loaded = true;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
