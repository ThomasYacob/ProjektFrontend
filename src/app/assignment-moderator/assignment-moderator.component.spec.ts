import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentModeratorComponent } from './assignment-moderator.component';

describe('AssignmentModeratorComponent', () => {
  let component: AssignmentModeratorComponent;
  let fixture: ComponentFixture<AssignmentModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentModeratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
