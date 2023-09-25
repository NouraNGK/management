import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneInvoiceComponent } from './one-invoice.component';

describe('OneInvoiceComponent', () => {
  let component: OneInvoiceComponent;
  let fixture: ComponentFixture<OneInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
