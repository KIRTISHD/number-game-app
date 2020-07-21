import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  name: string;

  
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.clearStorage();
  }

  startGame() {
    if (this.name === undefined){
      alert("Please enter your name");
    }
    else if (this.name.length > 10 || this.name.length < 3) {
      alert('length of name should be between 3 and 10');
      this.name = '';
    }
    else{
      this.userService.setStorage(this.name);
      this.router.navigate(['/game']);
    }
  }

  handleevent(event){
    if(event.keyCode === 13)
    {
      this.startGame();
    }
  }

}
