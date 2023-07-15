import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AIDashboardComponent } from './ai-dashboard.component';

describe('AIDashboardComponent', () => {
  let component: AIDashboardComponent;
  let fixture: ComponentFixture<AIDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AIDashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AIDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
