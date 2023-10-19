import { Component } from '@angular/core';
import { Product } from '../product.class';
import { SystemService } from 'src/app/core/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {

  product: Product | null = null;

  vendors: Vendor[] = [];

  loaded: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private prodSvc: ProductService,
    private vendSvc: VendorService,
    private router: Router
  ) { }

  send(): void {

    this.product!.price = +this.product!.price;
    this.product!.vendorId = +this.product!.vendorId;

    this.prodSvc.change(this.product!).subscribe({
      next: (res) => {
        console.debug(res);
        this.router.navigateByUrl("/product/list");
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {

    if(!this.sysSvc.loggedIn()) return;

    let id = this.route.snapshot.params["id"];
    this.prodSvc.get(id).subscribe({
      next: (res) => {
        console.debug(res);
        this.product = res;
        this.loaded = true;
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.vendSvc.list().subscribe({
      next: (res) => {
        console.debug(res);
        this.vendors = res;
      },
      error: (err) => {
        console.error(err);
      }
    });

  }
}
