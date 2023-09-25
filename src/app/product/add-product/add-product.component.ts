import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  word: string = "add product";
  productForm!: FormGroup;
  imagePreview!: string;
  decodedToken: any;
  product: any;
  id: any;
  title: string = "Add";

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let jwt = sessionStorage.getItem("jwt");
    this.decodedToken = jwt ? this.decodeToken(jwt) : null;
    console.log("Here is decodedToken:", this.decodedToken);

    this.productForm = this.formBuilder.group({
      productName: ["", [Validators.required, Validators.minLength(3)]],
      price: ["", [Validators.required, Validators.min(0)]],
      stock: ["", [Validators.required, Validators.min(5)]],
      category: ["", [Validators.required]],
      img: ["", [Validators.required, this.imgTypeValidator(['png', 'jpg', 'jpeg'])]]
    });

    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      // alert("Here into Edit");
      this.title = "Edit";
      this.productService.getProductById(this.id).subscribe(
        (response) => {
          this.product = response.product;
          this.productForm.patchValue({
            productName: this.product.productName,
            price: this.product.price,
            stock: this.product.stock,
            category: this.product.category,
            img: this.product.img
          });
        });
    }
  }

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;

    if (files && files.length > 0) {
      const file = files[0];
      const imgControl = this.productForm.get('img');

      if (imgControl) {
        imgControl.patchValue(file);
        imgControl.markAsTouched();
        imgControl.updateValueAndValidity();
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  imgTypeValidator(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value instanceof File) {
        const file = control.value as File;
        const extension = file.name.split('.').pop();
        if (extension) {
          const lowerCaseExtension = extension.toLowerCase();
          if (allowedTypes.indexOf(lowerCaseExtension) === -1) {
            return { invalidFileType: true };
          }
        }
      }
      return null;
    };
  }

  validate() {
    if (this.id) {
      // console.log("here is the new product to send", this.productForm.value);
      // console.log("here is the new image to send", this.productForm.value.img);
      this.productService.editProduct(this.id, this.productForm.value, this.productForm.value.img).subscribe(
        (response) => {
          console.log("here is response after editing product", response.msg);
          if (response.msg === "Edited With Success") {
            Swal.fire({
              icon: 'success',
              title: 'product Edited Successfully!',
              text: 'Your product has been successfully edited.',
              timer: 4000,
              showConfirmButton: false
            });
            this.router.navigate(["all-products"]);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to edit the product. Please try again later.',
              timer: 4000,
              showConfirmButton: false
            });
          }
        });
    } else {
      this.productForm.value.idUser = this.decodedToken.userId;
      console.log("Here is the product object to send to the BE side:", this.productForm.value);
      this.productService.addObj(this.productForm.value, this.productForm.value.img).subscribe((response) => {
        console.log("Here is the msg from the BE side:", response.msg);
        if (response.msg == "1") {
          this.router.navigate(["all-products"]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to add product',
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false
          });
        }
      });
    }
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

}