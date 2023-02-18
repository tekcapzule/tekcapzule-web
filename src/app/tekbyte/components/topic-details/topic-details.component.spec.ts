import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDetailsPageComponent } from './topic-details.component';

describe('TopicDetailsPageComponent', () => {
  let component: TopicDetailsPageComponent;
  let fixture: ComponentFixture<TopicDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
