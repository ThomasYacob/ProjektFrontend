import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyAssignmentComponent } from './monthly-assignment.component';

describe('MonthlyAssignmentComponent', () => {
  let component: MonthlyAssignmentComponent;
  let fixture: ComponentFixture<MonthlyAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
