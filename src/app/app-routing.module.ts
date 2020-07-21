import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { GameComponent } from './game/game.component';
import { FinishComponent } from './finish/finish.component';
import { AuthGuard } from './auth/auth.guard';
import { ScoreComponent } from './score/score.component';


const routes: Routes = [
  { path: 'game', component: GameComponent, canActivate: [AuthGuard]},
  { path: 'finish', component: FinishComponent, canActivate: [AuthGuard]},
  { path: 'highscores', component: ScoreComponent },
  { path: '', component: StartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
