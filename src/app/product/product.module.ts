import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { OneProductComponent } from './one-product/one-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchProductByNameComponent } from './search-product-by-name/search-product-by-name.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddProductComponent,
    AllProductsComponent,
    OneProductComponent,
    ProductDetailsComponent,
    SearchProductByNameComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ProductModule { }
