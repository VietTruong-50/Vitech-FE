import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruSliderComponent } from './cru-slider.component';

describe('CruSliderComponent', () => {
  let component: CruSliderComponent;
  let fixture: ComponentFixture<CruSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CruSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
