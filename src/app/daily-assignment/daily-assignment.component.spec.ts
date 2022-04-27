import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyAssignmentComponent } from './daily-assignment.component';

describe('DailyAssignmentComponent', () => {
  let component: DailyAssignmentComponent;
  let fixture: ComponentFixture<DailyAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
