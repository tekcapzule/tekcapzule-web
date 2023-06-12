import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TekbyteDetailsComponent } from './tekbyte-details.component';

describe('TopicDetailsComponent', () => {
  let component: TekbyteDetailsComponent;
  let fixture: ComponentFixture<TekbyteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TekbyteDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TekbyteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
