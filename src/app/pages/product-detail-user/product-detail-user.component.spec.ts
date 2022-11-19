import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailUserComponent } from './product-detail-user.component';

describe('ProductDetailUserComponent', () => {
  let component: ProductDetailUserComponent;
  let fixture: ComponentFixture<ProductDetailUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
