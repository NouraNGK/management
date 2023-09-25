import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productURL: string = "http://localhost:3003/api/products";
  constructor(private http: HttpClient) { }

  addObj(product: any, img: File) {
    let formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("category", product.category);
    formData.append("img", img);
    formData.append("userId", product.idUser);
    return this.http.post<{ msg: string }>(this.productURL, formData);
  }

  getProducts() {
    return this.http.get<{ allProducts: any }>(this.productURL);
  }

  getProductByName(productObj: any) {
    return this.http.post<{ msg: string, product: any }>(`${this.productURL}/search`, productObj);
  }

  deleteOneProduct(id: any) {
    return this.http.delete<{ msg: string }>(`${this.productURL}/${id}`);
  }

  getProductById(id: any) {
    return this.http.get<{ product: any }>(`${this.productURL}/${id}`);
  }

  editProduct(id: string, newObject: any, img: File) {
    let formData = new FormData();
    formData.append("productName", newObject.productName);
    formData.append("price", newObject.price);
    formData.append("stock", newObject.stock);
    formData.append("category", newObject.category);
    formData.append("img", img);
    return this.http.put<{ msg: string }>(`${this.productURL}/editProduct/${id}`, formData);
  }

}