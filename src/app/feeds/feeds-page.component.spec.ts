import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedsPageComponent } from './feeds-page.component';

describe('CapsulesPageComponent', () => {
  let component: FeedsPageComponent;
  let fixture: ComponentFixture<FeedsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
