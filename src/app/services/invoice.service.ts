import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoiceURL: string = "http://localhost:3003/api/invoices";
  constructor(private http: HttpClient) { }

  addInvoiceObj(obj: any) {
    return this.http.post<{msg: string}>(this.invoiceURL, obj);
  }

  getInvoices() {
    return this.http.get<{ invoices: any }>(this.invoiceURL);
  }

  getInvoiceById(id: any) {
    return this.http.get<{ invoice: any }>(`${this.invoiceURL}/${id}`);
  }

  deleteInvoice(id: any) {
    return this.http.delete<{ msg: string }>(`${this.invoiceURL}/${id}`);
  }
}