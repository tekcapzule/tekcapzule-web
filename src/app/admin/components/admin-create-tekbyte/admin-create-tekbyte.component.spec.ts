import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateTekByteComponent } from './admin-create-tekbyte.component';

describe('AdminCreateTopicComponent', () => {
  let component: AdminCreateTekByteComponent;
  let fixture: ComponentFixture<AdminCreateTekByteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCreateTekByteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateTekByteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
