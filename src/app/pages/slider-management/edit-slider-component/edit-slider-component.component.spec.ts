import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSliderComponentComponent } from './edit-slider-component.component';

describe('EditSliderComponentComponent', () => {
  let component: EditSliderComponentComponent;
  let fixture: ComponentFixture<EditSliderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSliderComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSliderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
