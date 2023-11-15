import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.class';
import { SystemService } from '../core/system.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  get url() { return `${this.sysSvc.config.baseUrl}/api/products`; }

  constructor(
    private sysSvc: SystemService,
    private http: HttpClient
  ) { }

  list(): Observable<Product[]> {
    return this.http.get(`${this.url}`) as Observable<Product[]>;
  }

  get(id: number): Observable<Product> {
    return this.http.get(`${this.url}/${id}`) as Observable<Product>;
  }

  create(product: Product): Observable<Product> {
    return this.http.post(`${this.url}`, product) as Observable<Product>;
  }

  change(product: Product): Observable<any> {
    return this.http.put(`${this.url}/${product.id}`, product) as Observable<any>;
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`) as Observable<any>;
  }
}
