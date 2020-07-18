import { Component, OnInit } from '@angular/core';
import { getLocaleNumberSymbol } from '@angular/common';
import { UserService } from '../services/user.service';
import { ParseErrorLevel } from '@angular/compiler';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {

  actualNumber: number;
  yourNumber: number;
  level: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getNumbers();
    this.userService.clearStorage();
  }

  getNumbers() {
    const temp = JSON.parse(localStorage.getItem('temp-numbers'));
    this.actualNumber = temp.actualNumber;
    this.yourNumber = temp.yourNumber;
    this.level = temp.level - 1;
  }
}
