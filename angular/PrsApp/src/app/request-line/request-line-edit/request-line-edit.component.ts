import { Component } from '@angular/core';
import { RequestLine } from '../request-line.class';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestLineService } from '../request-line.service';
import { SystemService } from 'src/app/core/system.service';
import { Product } from 'src/app/product/product.class';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-request-line-edit',
  templateUrl: './request-line-edit.component.html',
  styleUrls: ['./request-line-edit.component.css']
})
export class RequestLineEditComponent {

  requestLine: RequestLine | null = null;

  loaded: boolean = false;

  products: Product[] = [];

  productPrice: number = 0;

  lineTotal: number = 0;

  constructor(
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private reqLineSvc: RequestLineService,
    private prodSvc: ProductService,
    private router: Router
  ) { }

  refreshPrice(): void {
    
    if (!this.requestLine) return;
    this.requestLine!.productId = +this.requestLine!.productId;
    
    if (this.products.length === 0) return;
    this.productPrice = this.products.find(p => p.id === this.requestLine!.productId)!.price;
    this.lineTotal = this.productPrice * this.requestLine!.quantity;
  }

  send(): void {

    this.reqLineSvc.change(this.requestLine!).subscribe({
      next: (res) => {
        console.debug(res);
        this.router.navigateByUrl(`/request/lines/${this.requestLine!.requestId}`);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {

    if (!this.sysSvc.loggedIn()) return;

    let id = this.route.snapshot.params["id"];
    this.reqLineSvc.get(id).subscribe({
      next: (res) => {
        console.debug(res);
        this.requestLine = res;
        this.loaded = true;
        this.refreshPrice();
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.prodSvc.list().subscribe({
      next: (res) => {
        console.debug(res);
        this.products = res;
        this.refreshPrice();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
