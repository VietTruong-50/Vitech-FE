import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountManagementComponent } from './customer-account-management.component';

describe('CustomerAccountManagementComponent', () => {
  let component: CustomerAccountManagementComponent;
  let fixture: ComponentFixture<CustomerAccountManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAccountManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
