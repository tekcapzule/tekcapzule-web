import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapsuleFeedsComponent } from './capsule-feeds.component';

describe('CapsuleFeedsComponent', () => {
  let component: CapsuleFeedsComponent;
  let fixture: ComponentFixture<CapsuleFeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapsuleFeedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapsuleFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
