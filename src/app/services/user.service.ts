import { Injectable } from '@angular/core';
// export const { Jwt } = require('jsonwebtoken');
import * as encoder from 'jsonwebtoken'; 
import * as crypto from 'crypto-js';  

@Injectable({
  providedIn: 'root'
})
export class UserService {

  secretKey = "YourSecretKeyForEncryption&Descryption";
  constructor() { }

  setStorage(username: string) {
    // const x = Jwt.sign({username: username},'thisissecretkey'); 
    //encoder.sign({username: username},'thisissecretkey');
    const x = crypto.AES.encrypt(username, this.secretKey.trim()).toString();
    localStorage.setItem('user-key', x);
    localStorage.setItem('username', username);
  }

 /*  encrypt(value : string) : string{
    const x = crypto.AES.encrypt(value, this.secretKey.trim()).toString();
    console.log(x);
    return x;
  } */

  /* decrypt(textToDecrypt : string){
    const x =  crypto.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(crypto.enc.Utf8);
  } */

  verifyStorage() {
    const usernameKeyFromStorage = localStorage.getItem('user-key');
    const usernameFromStorage = localStorage.getItem('username');
    if (usernameKeyFromStorage == null || usernameFromStorage == null) return false;
    const x =  crypto.AES.decrypt(usernameKeyFromStorage, this.secretKey.trim()).toString(crypto.enc.Utf8);
    return (x === usernameFromStorage) ? true : false;
  }

  clearStorage() {
    localStorage.clear();
  }

  storeNumber(actualNumber: number, yourNumber: number, level:number) {
    localStorage.setItem('temp-numbers',JSON.stringify({actualNumber: actualNumber, yourNumber: yourNumber, level: level}));
  }
  
  getUsername() {
    return localStorage.getItem('username');
  }
}
