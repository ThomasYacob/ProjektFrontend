import { Component, OnInit } from '@angular/core';
import { ScoreboardService } from '../_services/scoreboard.service';
import { Scoreboard } from './scoreboard';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {

  constructor(private scoreBoardService:ScoreboardService ) { }

  scoreboards?: Scoreboard[];

  ngOnInit(): void {
    console.log('All scoreboards')
    this.scoreBoardService.getAllScoreBoard().subscribe(data =>{
      console.log(data)
      this.scoreboards = data
    })
  }

}
