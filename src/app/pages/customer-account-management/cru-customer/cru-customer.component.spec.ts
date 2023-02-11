import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruCustomerComponent } from './cru-customer.component';

describe('CruCustomerComponent', () => {
  let component: CruCustomerComponent;
  let fixture: ComponentFixture<CruCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CruCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
