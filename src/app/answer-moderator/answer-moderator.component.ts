import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ScoreboardService } from '../_services/scoreboard.service';
import { userAnswer } from '../_services/userAnswer';
import { UseranswerService } from '../_services/useranswer.service';

@Component({
  selector: 'app-answer-moderator',
  templateUrl: './answer-moderator.component.html',
  styleUrls: ['./answer-moderator.component.css']
})
export class AnswerModeratorComponent implements OnInit {

  myForm = new FormGroup({
    pointsToAdd: new FormControl(''),
  })
  constructor(private userAnswerService : UseranswerService, private scoreboardService : ScoreboardService) { }

    submitted = false;
  userAnswers? : userAnswer[];

  ngOnInit(): void {
    this.userAnswerService.getAlluserAnswersUncorrected().subscribe(data =>{
      this.userAnswers = data;
    })
  }

  correctQuestion(username : String, userAnswerid : number,typeOfQuestion : number){
    this.submitted = true;
    if(this.myForm.invalid){
      return;
    }
    this.userAnswerService.setTocorrected(userAnswerid).subscribe();
    this.scoreboardService.updateScore(username,typeOfQuestion,this.myForm.value);
  }

}
