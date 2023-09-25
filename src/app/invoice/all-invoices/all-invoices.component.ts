import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-invoices',
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.css']
})
export class AllInvoicesComponent implements OnInit {

  invoicesTab: any;
  constructor(private invoiceService: InvoiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe((response) => {
      if (response.invoices.length === 0) {
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
        this.invoicesTab = response.invoices;
      }
    });
  }

  goToInfo(id: any) {
    this.router.navigate([`invoice/one-invoice/${id}`]);
  }

  delete(id: any) {
    this.invoiceService.deleteInvoice(id).subscribe((response) => {
      if (response.msg == "1") {
        this.router.navigate([""]);
      }
    });
  }

}