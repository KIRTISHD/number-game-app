import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  score: any[] = [];

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.fileService.accessServer().subscribe((result: any)=> {this.score = result.scores; this.scoresort();}, error => console.log(error), () => {console.log(this.score);});
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

}
