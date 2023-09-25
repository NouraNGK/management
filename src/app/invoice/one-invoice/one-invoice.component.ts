import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-one-invoice',
  templateUrl: './one-invoice.component.html',
  styleUrls: ['./one-invoice.component.css']
})
export class OneInvoiceComponent implements OnInit {

  @Input() invoiceInput: any;
  constructor(private activatedRoute: ActivatedRoute,
    private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    let invoiceId = this.activatedRoute.snapshot.paramMap.get("id");
    this.invoiceService.getInvoiceById(invoiceId).subscribe((response) => {
      this.invoiceInput = response.invoice;
    });
  }

}