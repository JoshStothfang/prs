import { Component } from '@angular/core';
import { SystemService } from '../system.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(
    private sysSvc: SystemService
  ) { }

  ngOnInit(): void {

    if (!this.sysSvc.loggedIn()) return;
  }
}
