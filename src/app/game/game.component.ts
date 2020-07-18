import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  actualNumber: number;
  showMode: boolean;
  timer: any;
  countdown: number = 5;
  startNumber = 1;
  endNumber = 9;
  usernumber: number;
  level = 1;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.showModeOn();
  }

  showModeOn() {
    this.showMode = true;
    this.getRandomNumber();
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
    
  }

  tick() {
    this.countdown--;
    if (this.countdown === 0) {
      clearInterval(this.timer);
      this.showModeOff();
      return;
    }
  }

  showModeOff() {
    this.showMode = false;
    this.countdown = 5;
  }

  getRandomNumber() {
    this.actualNumber = Math.floor(Math.random() * (this.endNumber - this.startNumber + 1)) + this.startNumber;
  }

  incNumber(){
    this.startNumber = ++this.endNumber;
    this.endNumber = this.startNumber * 10 - 1;
  }


  checkNumber() {
    if (this.usernumber == this.actualNumber) {
      this.usernumber = null;
      this.level++;
      this.incNumber();
      this.showModeOn();
    }
    else{
      this.userService.storeNumber(this.actualNumber, this.usernumber, this.level);
      this.router.navigate(['/finish']);
      return;
    }
  }
}
