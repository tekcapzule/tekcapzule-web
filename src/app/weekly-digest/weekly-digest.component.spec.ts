import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyDigestComponent } from './weekly-digest.component';

describe('WeeklyDigestComponent', () => {
  let component: WeeklyDigestComponent;
  let fixture: ComponentFixture<WeeklyDigestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeeklyDigestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyDigestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
