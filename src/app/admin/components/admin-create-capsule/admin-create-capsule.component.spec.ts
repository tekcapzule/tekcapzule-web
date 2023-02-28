import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateCapsuleComponent } from './admin-create-capsule.component';

describe('AdminCreateCapsuleComponent', () => {
  let component: AdminCreateCapsuleComponent;
  let fixture: ComponentFixture<AdminCreateCapsuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCreateCapsuleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateCapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
