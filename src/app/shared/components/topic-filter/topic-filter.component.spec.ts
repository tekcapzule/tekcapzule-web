import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicFilterComponent } from './topic-filter.component';

describe('TopicFilterComponent', () => {
  let component: TopicFilterComponent;
  let fixture: ComponentFixture<TopicFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopicFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
