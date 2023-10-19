import { Component } from '@angular/core';
import { SystemService } from 'src/app/core/system.service';
import { RequestLine } from '../request-line.class';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product/product.service';
import { Product } from 'src/app/product/product.class';

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

  constructor(
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private prodSvc: ProductService
  ) { }

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
