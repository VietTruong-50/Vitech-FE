import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressNotePageComponent } from './address-note-page.component';

describe('AddressNotePageComponent', () => {
  let component: AddressNotePageComponent;
  let fixture: ComponentFixture<AddressNotePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressNotePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressNotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
