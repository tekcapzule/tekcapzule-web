import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TekBytePageComponent } from './tek-byte-page.component';

describe('TekBytePageComponent', () => {
  let component: TekBytePageComponent;
  let fixture: ComponentFixture<TekBytePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TekBytePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TekBytePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
