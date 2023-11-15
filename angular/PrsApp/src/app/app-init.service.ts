import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  config: any = null;

  constructor(
    private http: HttpClient
  ) { }

  getSettings(): void {
    this.http.get("./assets/config.json").subscribe(
      (cfg) => {
        this.config = cfg;
        console.debug(this.config);
      }
    );
  }
}
