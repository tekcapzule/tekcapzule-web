import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateTopicComponent } from './admin-create-topic.component';

describe('AdminCreateTopicComponent', () => {
  let component: AdminCreateTopicComponent;
  let fixture: ComponentFixture<AdminCreateTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
