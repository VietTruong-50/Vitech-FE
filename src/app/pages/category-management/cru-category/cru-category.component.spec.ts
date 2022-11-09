import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CruCategoryComponent } from './cru-category.component';

describe('CruCategoryComponent', () => {
  let component: CruCategoryComponent;
  let fixture: ComponentFixture<CruCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CruCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CruCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
