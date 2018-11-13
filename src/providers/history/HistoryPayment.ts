import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HistoryPaymentProvider {

  url = "http://sadad.cf:8000/api/";
  getUserUrl = "getByUsers";
  getAllUserTransactionUrl = "getAllTransaction";
  token = localStorage.getItem('token');

  constructor(public http: HttpClient) {
  }

  getHistoryProvider() {
    let url = this.url + this.getUserUrl;
    return new Promise((resolve, reject) => {
      this.http.get(url, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
          .set('Authorization', "Bearer " + this.token),
      }).subscribe(res => {
        resolve(res)
      }, (err) => {
        reject(err)
      });
    });
  }


  getAllHistoryProvider() {
    let url = this.url + this.getAllUserTransactionUrl;
    return new Promise((resolve, reject) => {
      this.http.get(url, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
          .set('Authorization', "Bearer " + this.token),
      }).subscribe(res => {
        resolve(res)
      }, (err) => {
        reject(err)
      });
    });
  }
}