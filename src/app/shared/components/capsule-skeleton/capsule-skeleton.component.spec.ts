import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapsuleSkeletonComponent } from './capsule-skeleton.component';

describe('CapsuleSkeletonComponent', () => {
  let component: CapsuleSkeletonComponent;
  let fixture: ComponentFixture<CapsuleSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapsuleSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapsuleSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
