import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TekbyteSkeletonComponent } from './tekbyte-skeleton.component';

describe('TekbyteSkeletonComponent', () => {
  let component: TekbyteSkeletonComponent;
  let fixture: ComponentFixture<TekbyteSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TekbyteSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TekbyteSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
