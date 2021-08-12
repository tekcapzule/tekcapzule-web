import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCarouselComponent } from './topic-carousel.component';

describe('TopicCarouselComponent', () => {
  let component: TopicCarouselComponent;
  let fixture: ComponentFixture<TopicCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopicCarouselComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
