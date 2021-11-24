import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductPageComponent } from './components/product-page/product-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component:  ProductsComponent},
  { path: 'product/:id', pathMatch: 'full', component:  ProductPageComponent},
  { path: '**', pathMatch: 'full', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
