import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedsSkeletonComponent } from './feeds-skeleton.component';

describe('FeedsSkeletonComponent', () => {
  let component: FeedsSkeletonComponent;
  let fixture: ComponentFixture<FeedsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedsSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
