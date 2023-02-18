import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TekByteCarouselComponent } from './tekbyte-carousel.component';

describe('TekByteCarouselComponent', () => {
  let component: TekByteCarouselComponent;
  let fixture: ComponentFixture<TekByteCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TekByteCarouselComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TekByteCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
