import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruOrderComponent } from './cru-order.component';

describe('CruOrderComponent', () => {
  let component: CruOrderComponent;
  let fixture: ComponentFixture<CruOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CruOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
