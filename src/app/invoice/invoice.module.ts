import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { AllInvoicesComponent } from './all-invoices/all-invoices.component';
import { OneInvoiceComponent } from './one-invoice/one-invoice.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddInvoiceComponent,
    AllInvoicesComponent,
    OneInvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class InvoiceModule { }
