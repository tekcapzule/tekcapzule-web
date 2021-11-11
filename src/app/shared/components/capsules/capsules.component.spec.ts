import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapsulesComponent } from './capsules.component';

describe('CapsulesComponent', () => {
  let component: CapsulesComponent;
  let fixture: ComponentFixture<CapsulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapsulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapsulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
