import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsAdminPageComponent } from './statistics-admin-page.component';

describe('StatisticsAdminPageComponent', () => {
  let component: StatisticsAdminPageComponent;
  let fixture: ComponentFixture<StatisticsAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsAdminPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
