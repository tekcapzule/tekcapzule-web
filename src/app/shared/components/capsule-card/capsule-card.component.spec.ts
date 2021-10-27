import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapsuleCardComponent } from './capsule-card.component';

describe('CapsuleCardComponent', () => {
  let component: CapsuleCardComponent;
  let fixture: ComponentFixture<CapsuleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapsuleCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapsuleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
