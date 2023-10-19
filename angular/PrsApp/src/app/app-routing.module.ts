import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E404Component } from './core/e404/e404.component';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { LoginComponent } from './core/login/login.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { VendorDetailComponent } from './vendor/vendor-detail/vendor-detail.component';
import { VendorCreateComponent } from './vendor/vendor-create/vendor-create.component';
import { VendorEditComponent } from './vendor/vendor-edit/vendor-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },

  { path: "login", component: LoginComponent },

  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },

  { path: "user/list", component: UserListComponent },
  { path: "user/detail/:id", component: UserDetailComponent },
  { path: "user/create", component: UserCreateComponent },
  { path: "user/edit/:id", component: UserEditComponent },

  { path: "vendor/list", component: VendorListComponent },
  { path: "vendor/detail/:id", component: VendorDetailComponent },
  { path: "vendor/create", component: VendorCreateComponent },
  { path: "vendor/edit/:id", component: VendorEditComponent },

  { path: "product/list", component: ProductListComponent },
  { path: "product/detail/:id", component: ProductDetailComponent },
  { path: "product/create", component: ProductCreateComponent },
  { path: "product/edit/:id", component: ProductEditComponent },

  { path: "**", component: E404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
