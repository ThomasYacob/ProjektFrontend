import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerModeratorComponent } from './answer-moderator.component';

describe('AnswerModeratorComponent', () => {
  let component: AnswerModeratorComponent;
  let fixture: ComponentFixture<AnswerModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerModeratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
