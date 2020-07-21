import { Component, OnInit } from '@angular/core';
import { getLocaleNumberSymbol } from '@angular/common';
import { UserService } from '../services/user.service';
import { ParseErrorLevel } from '@angular/compiler';
import { FileService } from '../services/file.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { threadId } from 'worker_threads';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {

  username: string;
  actualNumber: number;
  yourNumber: number;
  level: number;
  score: any[] = [];
  timeTaken: number = 5;
  gotAllData = false;
  returnItself:Subscription;

  constructor(private userService: UserService, private fileService: FileService) {
    console.log("constructor call")
    this.calcHigh();

    this.getNumbers();
   }

  ngOnInit() {
    //this.userService.clearStorage();
    console.log("component loaded")

    //this.calcHigh();
  }

  getNumbers() {
    const temp = JSON.parse(localStorage.getItem('temp-numbers'));
    this.username = this.userService.getUsername();
    this.actualNumber = temp.actualNumber;
    this.yourNumber = temp.yourNumber;
    this.level = temp.level - 1;

  }

  calcHigh(){
    /*
    console.log('in calchigh');
    this.fileService.accessServer().subscribe(
      (result: any)=> {
        console.log('got scores');
        this.score = result.scores; this.scoresort();
      },
      error => console.log(error),
      () => {
        console.log(this.score);
        console.log(this.score[this.score.length-1].score);
        console.log(this.level);

        if (this.score[this.score.length-1].score < this.level || this.score.length <= 10) {
          console.log('got in high scores-', this.username, this.level, this.timeTaken);
          this.fileService.sendScore(this.username, this.level, this.timeTaken).subscribe(
            (res: any) => {console.log('scores stored' + res.message)}, 
            err=> console.log('error in storing high score' + err),
            () => {
              this.userService.clearStorage();
            });
        }
        else{
          this.userService.clearStorage();
        }
      }
    );
    */

  //  this.fileService.sendScore(this.username, this.level, this.timeTaken).subscribe(
  //   (res: any) => {console.log('scores stored' + res.message)}, 
  //   err=> console.log('error in storing high score' + err),
  //   () => {
  //   });

  // some check is calling inside guard and thats why refresh is happening
  //

      this.returnItself = this.fileService.sendScore(this.username, this.level, this.timeTaken).subscribe(
        res=> {console.log('scores stored' + res.message)}, 
        err=> console.log('error in storing high score' + err),
        () => {
          console.log('in clear part');
          //localStorage.clear();
          this.gotAllData = true;
        });
        
  }

  scoresort() {
    this.score.sort( (a, b) => {
      if (b.score == a.score){
        return b.time - a.time;
      }
      return b.score - a.score;
    });
    this.score = this.score.slice(0, (this.score.length < 10) ? (this.score.length) : 10);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.returnItself.unsubscribe();
  }
}
