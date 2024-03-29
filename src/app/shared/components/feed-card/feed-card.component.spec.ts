import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCardComponent } from './feed-card.component';

describe('FeedsCardComponent', () => {
  let component: FeedCardComponent;
  let fixture: ComponentFixture<FeedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
