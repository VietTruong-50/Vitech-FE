import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruBrandComponent } from './cru-brand.component';

describe('CruBrandComponent', () => {
  let component: CruBrandComponent;
  let fixture: ComponentFixture<CruBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CruBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
