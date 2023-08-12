import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsPageComponent } from './insights-page.component';

describe('InsightsPageComponent', () => {
  let component: InsightsPageComponent;
  let fixture: ComponentFixture<InsightsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsightsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsightsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
