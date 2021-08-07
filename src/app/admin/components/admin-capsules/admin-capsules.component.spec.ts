import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCapsulesComponent } from './admin-capsules.component';

describe('AdminCapsulesComponent', () => {
  let component: AdminCapsulesComponent;
  let fixture: ComponentFixture<AdminCapsulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCapsulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCapsulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
