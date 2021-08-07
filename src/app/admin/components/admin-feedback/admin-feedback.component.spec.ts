import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeedbackComponent } from './admin-feedback.component';

describe('AdminFeedbackComponent', () => {
  let component: AdminFeedbackComponent;
  let fixture: ComponentFixture<AdminFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
