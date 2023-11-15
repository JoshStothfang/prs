import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from './vendor.class';
import { Observable } from 'rxjs';
import { SystemService } from '../core/system.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  get url() { return `${this.sysSvc.config.baseUrl}/api/vendors`; }

  constructor(
    private sysSvc: SystemService,
    private http: HttpClient
  ) { }

  list(): Observable<Vendor[]> {
    return this.http.get(`${this.url}`) as Observable<Vendor[]>;
  }

  get(id: number): Observable<Vendor> {
    return this.http.get(`${this.url}/${id}`) as Observable<Vendor>;
  }

  create(vendor: Vendor): Observable<Vendor> {
    return this.http.post(`${this.url}`, vendor) as Observable<Vendor>;
  }

  change(vendor: Vendor): Observable<any> {
    return this.http.put(`${this.url}/${vendor.id}`, vendor) as Observable<any>;
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`) as Observable<any>;
  }
}
