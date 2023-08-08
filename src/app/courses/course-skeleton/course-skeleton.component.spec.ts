import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSkeletonComponent } from './course-skeleton.component';

describe('CourseSkeletonComponent', () => {
  let component: CourseSkeletonComponent;
  let fixture: ComponentFixture<CourseSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
