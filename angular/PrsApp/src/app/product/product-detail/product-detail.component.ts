import { Component } from '@angular/core';
import { Product } from '../product.class';
import { SystemService } from 'src/app/core/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  product: Product | null = null;

  loaded: boolean = false;

  removeToggled: boolean = false;

  constructor(
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private prodSvc: ProductService,
    private router: Router
  ) { }

  toggleRemove(): void {
    this.removeToggled = !this.removeToggled;
  }

  remove(): void {
    this.prodSvc.remove(this.product!.id).subscribe({
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

    let id: number = this.route.snapshot.params["id"];
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
  }
}
