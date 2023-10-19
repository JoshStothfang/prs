import { Component } from '@angular/core';
import { SystemService } from 'src/app/core/system.service';
import { Product } from '../product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products: Product[] = [];

  loaded: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private prodSvc: ProductService
  ) { }

  ngOnInit(): void {

    if (!this.sysSvc.loggedIn()) return;

    this.prodSvc.list().subscribe({
      next: (res) => {
        console.debug(res);
        this.products = res;
        this.loaded = true;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
