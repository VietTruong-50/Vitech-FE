import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruBannerComponent } from './cru-banner.component';

describe('CruBannerComponent', () => {
  let component: CruBannerComponent;
  let fixture: ComponentFixture<CruBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CruBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
