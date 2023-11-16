import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedSkeletonComponent } from './feed-skeleton.component';

describe('FeedSkeletonComponent', () => {
  let component: FeedSkeletonComponent;
  let fixture: ComponentFixture<FeedSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
