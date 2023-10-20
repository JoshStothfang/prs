import { Component } from '@angular/core';
import { SystemService } from 'src/app/core/system.service';
import { RequestLine } from '../request-line.class';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/product/product.service';
import { Product } from 'src/app/product/product.class';
import { RequestLineService } from '../request-line.service';

@Component({
  selector: 'app-request-line-create',
  templateUrl: './request-line-create.component.html',
  styleUrls: ['./request-line-create.component.css']
})
export class RequestLineCreateComponent {

  requestLine: RequestLine = new RequestLine();

  products: Product[] = [];

  loaded: boolean = false;

  productPrice: number = 0;

  lineTotal: number = 0;

  constructor(
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private prodSvc: ProductService,
    private reqLineSvc: RequestLineService,
    private router: Router
  ) { }

  refreshPrice(): void {
    
    this.requestLine.productId = +this.requestLine.productId;
    
    this.productPrice = this.products.find(p => p.id === this.requestLine.productId)?.price as number;
    this.lineTotal = this.productPrice * this.requestLine.quantity;
  }

  send(): void {

    this.reqLineSvc.create(this.requestLine).subscribe({
      next: (res) => {
        console.debug(res);
        this.router.navigateByUrl(`/request/detail/${this.requestLine.requestId}`);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {

    if (!this.sysSvc.loggedIn()) return;

    this.requestLine.requestId = +this.route.snapshot.params["requestId"];

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
