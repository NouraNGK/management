import { Component, OnInit } from '@angular/core';
// import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any;
  errorMsg!: string;
  constructor(
    // private productService: ProductService
    ) { }

  ngOnInit(): void {
    // this.productService.getFirstSixProducts().subscribe((response) => {
    //   this.products = response.sixProducts;
    //   console.log("Here is the firstSixProducts:", this.products);
    // });
  }

}