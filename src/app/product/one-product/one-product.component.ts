import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent implements OnInit {

  @Input() 
  productInput: any;
  
  constructor(private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
  }

  productInfo(id: any) {
    this.router.navigate([`product/productInfo/${id}`]);
  }

  delete(id: any) {
    this.productService.deleteOneProduct(id).subscribe((response) => {
      if (response.msg == "1") {
        this.router.navigate([""]);
      }
    });
  }

  edit(id: any) {
    this.router.navigate([`product/edit/product/${id}`]);
  }

  priceColor(price: any) {
    if (price >= 0 && price <= 500) {
      return "red";
    } else if (price >= 501 && price <= 1500) {
      return "green";
    } else {
      return "orange";
    }
  }

}