import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCheckDialogComponent } from './inventory-check-dialog.component';

describe('InventoryCheckDialogComponent', () => {
  let component: InventoryCheckDialogComponent;
  let fixture: ComponentFixture<InventoryCheckDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryCheckDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryCheckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
