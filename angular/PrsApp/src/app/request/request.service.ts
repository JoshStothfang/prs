import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from './request.class';
import { SystemService } from '../core/system.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  get url() { return `${this.sysSvc.config.baseUrl}/api/requests`; }

  constructor(
    private sysSvc: SystemService,
    private http: HttpClient
  ) { }

  list(): Observable<Request[]> {
    return this.http.get(`${this.url}`) as Observable<Request[]>;
  }

  get(id: number): Observable<Request> {
    return this.http.get(`${this.url}/${id}`) as Observable<Request>;
  }

  reviews(id: number): Observable<Request[]> {
    return this.http.get(`${this.url}/reviews/${id}`) as Observable<Request[]>;
  }

  create(request: Request): Observable<Request> {
    return this.http.post(`${this.url}`, request) as Observable<Request>;
  }

  change(request: Request): Observable<any> {
    return this.http.put(`${this.url}/${request.id}`, request) as Observable<any>;
  }

  review(request: Request): Observable<any> {
    return this.http.put(`${this.url}/review/${request.id}`, request) as Observable<any>;
  }

  approve(request: Request): Observable<any> {
    return this.http.put(`${this.url}/approve/${request.id}`, request) as Observable<any>;
  }

  reject(request: Request): Observable<any> {
    return this.http.put(`${this.url}/reject/${request.id}`, request) as Observable<any>;
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`) as Observable<any>;
  }
}
