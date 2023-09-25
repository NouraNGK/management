import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-product-by-name',
  templateUrl: './search-product-by-name.component.html',
  styleUrls: ['./search-product-by-name.component.css']
})
export class SearchProductByNameComponent implements OnInit {

  word: string = "search product";
  searchForm!: FormGroup;
  findedProduct: any;
  constructor(private formBuilder: FormBuilder,
    private productService: ProductService
    ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      productName: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  search() {
    this.productService.getProductByName(this.searchForm.value).subscribe((response) => {
      if (response.msg === "1") {
        this.findedProduct = response.product;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Product Not Found!',
          text: 'Sorry, the product you are looking for was not found. Please check the entered values',
        });
      }
    });
  }

}