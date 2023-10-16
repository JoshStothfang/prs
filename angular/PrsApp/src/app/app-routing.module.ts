import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E404Component } from './core/e404/e404.component';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },

  { path: "login", component: LoginComponent },

  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },

  { path: "**", component: E404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
