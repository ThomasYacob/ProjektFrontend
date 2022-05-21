import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent} from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { DailyAssignmentComponent } from './daily-assignment/daily-assignment.component'
import { WeeklyAssignmentComponent } from './weekly-assignment/weekly-assignment.component'
import { MonthlyAssignmentComponent } from './monthly-assignment/monthly-assignment.component'
import { ScoreBoardComponent } from './score-board/score-board.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {path: '', component: LoginComponent},
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'assignment', component:AssignmentComponent},
  { path: 'daily-assignment', component:DailyAssignmentComponent},
  { path: 'weekly-assignment', component:WeeklyAssignmentComponent},
  { path: 'score-board', component:ScoreBoardComponent},
  { path: 'monthly-assignment', component:MonthlyAssignmentComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

