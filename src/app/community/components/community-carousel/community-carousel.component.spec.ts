import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityCarouselComponent } from './community-carousel.component';

describe('CommunityCarouselComponent', () => {
  let component: CommunityCarouselComponent;
  let fixture: ComponentFixture<CommunityCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityCarouselComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
