import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateFormComponent } from './collaborate-form.component';

describe('CollaborateFormComponent', () => {
  let component: CollaborateFormComponent;
  let fixture: ComponentFixture<CollaborateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaborateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
