import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

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
      alert('username length should be between 3 and 10');
      this.name = '';
    }
    else{
      this.userService.setStorage(this.name);
      this.router.navigate(['/game']);
    }
  }

}
