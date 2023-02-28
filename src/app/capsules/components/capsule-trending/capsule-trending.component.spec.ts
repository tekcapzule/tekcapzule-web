import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapsuleTrendingComponent } from './capsule-trending.component';

describe('CapsuleTrendingComponent', () => {
  let component: CapsuleTrendingComponent;
  let fixture: ComponentFixture<CapsuleTrendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapsuleTrendingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapsuleTrendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
