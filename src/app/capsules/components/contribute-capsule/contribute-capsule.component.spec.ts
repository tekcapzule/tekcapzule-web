import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributeCapsuleComponent } from './contribute-capsule.component';

describe('ContributeCapsuleComponent', () => {
  let component: ContributeCapsuleComponent;
  let fixture: ComponentFixture<ContributeCapsuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContributeCapsuleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributeCapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
