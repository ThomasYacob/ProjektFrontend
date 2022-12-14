import { Component, OnInit } from '@angular/core';
import { ScoreboardService } from '../_services/scoreboard.service';
import { Scoreboard } from './scoreboard';
import { UserService } from '../_services/user.service';
import { User } from '../user';
import {TokenStorageService} from "../_services/token-storage.service";
import { UserUserName } from '../register/userUserName';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {

  constructor(private scoreBoardService: ScoreboardService, private userService: UserService,
              private token: TokenStorageService) { }

  // @ts-ignore
  scoreboards: Scoreboard[];
  users: String[] | undefined;
  currentUser: any;


  ngOnInit(): void {
    console.log('All scoreboards')
    this.scoreBoardService.getAllScoreBoard().subscribe(data =>{
      console.log(data)
      this.scoreboards = data
    })


      console.log('All users ')
        this.userService.getUserWithoutPassword().subscribe(data => {
            console.log(data);
            this.users = data;
        })

    this.currentUser = this.token.getUser();
  }

}
