import { Component } from '@angular/core';
import { Menu } from '../menu.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menuWidth: string = "";

  menus: Menu[] = [
    new Menu("Home", "/home"),
    new Menu("About", "/about"),
    new Menu("Users", "/user/list"),
    new Menu("Vendors", "/vendor/list"),
    new Menu("Products", "/product/list"),
    new Menu("Requests", "/request/list")
  ];

  ngOnInit(): void {

    this.menuWidth = `${100 / this.menus.length}%`;
  }
}
