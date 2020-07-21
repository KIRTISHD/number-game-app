import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  accessServer(): Observable<any>{
    return this.http.get<any>('http://localhost:4300/getScore');
  }

  sendScore(username: string, score: number, time: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const options = { headers: headers};
    return this.http.post<any>('http://localhost:4300/storeScore',{username: username, score: score, time: time}, options);
  }
}
