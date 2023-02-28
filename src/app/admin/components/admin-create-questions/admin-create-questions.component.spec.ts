import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateQuestionsComponent } from './admin-create-questions.component';

describe('AdminCreateQuestionsComponent', () => {
  let component: AdminCreateQuestionsComponent;
  let fixture: ComponentFixture<AdminCreateQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCreateQuestionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
