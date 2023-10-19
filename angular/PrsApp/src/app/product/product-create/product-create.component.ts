import { Component } from '@angular/core';
import { Product } from '../product.class';
import { SystemService } from 'src/app/core/system.service';
import { ProductService } from '../product.service';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Vendor } from 'src/app/vendor/vendor.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  product: Product = new Product();

  vendors: Vendor[] = [];

  loaded: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private vendSvc: VendorService,
    private prodSvc: ProductService,
    private router: Router
  ) { }

  send(): void {

    this.product.price = +this.product.price;
    this.product.vendorId = +this.product.vendorId;
    
    this.prodSvc.create(this.product).subscribe({
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
