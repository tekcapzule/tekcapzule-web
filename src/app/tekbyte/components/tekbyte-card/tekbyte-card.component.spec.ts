import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TekbyteCardComponent } from './tekbyte-card.component';

describe('TekbyteCardComponent', () => {
  let component: TekbyteCardComponent;
  let fixture: ComponentFixture<TekbyteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TekbyteCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TekbyteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
