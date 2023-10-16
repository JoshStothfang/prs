import { Component } from '@angular/core';
import { SystemService } from '../system.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private sysSvc: SystemService
  ) { }

  ngOnInit(): void {

    if (!this.sysSvc.loggedIn()) return;
  }
}
