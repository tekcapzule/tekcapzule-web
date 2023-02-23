import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TekByteTopicDetailsPageComponent } from './tekbyte-topic-details.component';

describe('TekByteTopicDetailsPageComponent', () => {
  let component: TekByteTopicDetailsPageComponent;
  let fixture: ComponentFixture<TekByteTopicDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TekByteTopicDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TekByteTopicDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
