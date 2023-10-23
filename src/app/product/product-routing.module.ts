import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { SearchProductByNameComponent } from './search-product-by-name/search-product-by-name.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: 'all-products', component: AllProductsComponent },
  { path: 'search', component: SearchProductByNameComponent },
  { path: 'productInfo/:id', component: ProductDetailsComponent },
  { path: 'edit/product/:id', component: AddProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
