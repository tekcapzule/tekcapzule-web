import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTekByteComponent } from './admin-tekbyte.component';

describe('AdminTopicsComponent', () => {
  let component: AdminTekByteComponent;
  let fixture: ComponentFixture<AdminTekByteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTekByteComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTekByteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
