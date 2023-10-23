import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { AllInvoicesComponent } from './all-invoices/all-invoices.component';
import { OneInvoiceComponent } from './one-invoice/one-invoice.component';


const routes: Routes = [
  { path: 'add-invoice', component: AddInvoiceComponent },
  { path: 'all-invoices', component: AllInvoicesComponent },
  { path: 'one-invoice/:id', component: OneInvoiceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
