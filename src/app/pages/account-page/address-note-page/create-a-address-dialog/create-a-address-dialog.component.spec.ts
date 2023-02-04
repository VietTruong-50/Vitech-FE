import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAAddressDialogComponent } from './create-a-address-dialog.component';

describe('CreateAAddressDialogComponent', () => {
  let component: CreateAAddressDialogComponent;
  let fixture: ComponentFixture<CreateAAddressDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAAddressDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
