import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatwedoComponent } from './whatwedo.component';

describe('WhatwedoComponent', () => {
  let component: WhatwedoComponent;
  let fixture: ComponentFixture<WhatwedoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhatwedoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatwedoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
