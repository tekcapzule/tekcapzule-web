import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapsulesPageComponent } from './capsules-page.component';

describe('CapsulesPageComponent', () => {
  let component: CapsulesPageComponent;
  let fixture: ComponentFixture<CapsulesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapsulesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapsulesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
