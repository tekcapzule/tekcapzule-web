import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributeFeedComponent } from './contribute-feed.component';

describe('ContributeCapsuleComponent', () => {
  let component: ContributeFeedComponent;
  let fixture: ComponentFixture<ContributeFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContributeFeedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributeFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
