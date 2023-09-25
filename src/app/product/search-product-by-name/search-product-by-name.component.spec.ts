import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductByNameComponent } from './search-product-by-name.component';

describe('SearchProductByNameComponent', () => {
  let component: SearchProductByNameComponent;
  let fixture: ComponentFixture<SearchProductByNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProductByNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
