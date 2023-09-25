import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit  {

  word: string = "products";
  products: any;
  constructor(
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      if (response.allProducts.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Not Found!',
          text: 'No products found',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          // Redirect to the home page after the timer expires
          this.router.navigate([""]);
        });
      } else {
        this.products = response.allProducts;
      }
    });
  }
  
}