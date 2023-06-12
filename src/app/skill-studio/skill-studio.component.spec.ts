import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillStudioComponent } from './skill-studio.component';

describe('MissionPageComponent', () => {
  let component: SkillStudioComponent;
  let fixture: ComponentFixture<SkillStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkillStudioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
