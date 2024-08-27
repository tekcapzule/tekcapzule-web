import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePortfolioComponent } from './service-portfolio.component';

describe('ServicesComponent', () => {
  let component: ServicePortfolioComponent;
  let fixture: ComponentFixture<ServicePortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicePortfolioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
