import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSliderComponentComponent } from './add-slider-component.component';

describe('AddSliderComponentComponent', () => {
  let component: AddSliderComponentComponent;
  let fixture: ComponentFixture<AddSliderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSliderComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSliderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
