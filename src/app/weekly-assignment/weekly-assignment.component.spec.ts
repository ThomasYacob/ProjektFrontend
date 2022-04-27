import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyAssignmentComponent } from './weekly-assignment.component';

describe('WeeklyAssignmentComponent', () => {
  let component: WeeklyAssignmentComponent;
  let fixture: ComponentFixture<WeeklyAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
