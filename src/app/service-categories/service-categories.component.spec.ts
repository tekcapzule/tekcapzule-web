import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCategoriesComponent } from './service-categories.component';

describe('ServiceCategoriesComponent', () => {
  let component: ServiceCategoriesComponent;
  let fixture: ComponentFixture<ServiceCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceCategoriesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
