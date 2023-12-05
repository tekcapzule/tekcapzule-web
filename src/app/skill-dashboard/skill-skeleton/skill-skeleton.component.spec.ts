import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSkeletonComponent } from './skill-skeleton.component';

describe('SkillSkeletonComponent', () => {
  let component: SkillSkeletonComponent;
  let fixture: ComponentFixture<SkillSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
