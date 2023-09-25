import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  invoiceForm!: FormGroup;
  decodedToken: any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    let jwt = sessionStorage.getItem("jwt");
    this.decodedToken = jwt ? this.decodeToken(jwt) : null;
    console.log("Here is decodedToken:", this.decodedToken);

    this.invoiceForm = this.formBuilder.group({
      customerName: ["", [Validators.required, Validators.minLength(5)]],
      invoiceDate: ["", Validators.required],
      productName: ["", [Validators.required, Validators.minLength(3)]],
      unitPrice: ["", [Validators.required, Validators.min(0)]],
      quantity: ["", [Validators.required, Validators.min(5)]],
      total: ["", [Validators.required, , Validators.min(1)]]
    })
  }

  addInvoice() {
    this.invoiceForm.value.idUser = this.decodedToken.userId;
      console.log("Here is the invoice object to send to the BE side:", this.invoiceForm.value);
      this.invoiceService.addInvoiceObj(this.invoiceForm.value).subscribe((response) => {
        console.log("Here is the msg from the BE side:", response.msg);
        if (response.msg == "1") {
          this.router.navigate(["invoice/all-invoices"]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to add invoice',
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false
          });
        }
      });
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

}