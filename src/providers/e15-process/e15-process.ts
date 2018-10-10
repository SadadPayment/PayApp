import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class E15ProcessProvider {
  url = "http://197.251.5.100:8000/api/";
  token = localStorage.getItem('token');


  constructor(public http: HttpClient) {
    console.log(this.token);
  }

  PayE15Provider(body) {
    console.log("Providers: ", body);
    return new Promise((resolve, reject) => {

      this.http.post(this.url + 'e15_payment', JSON.stringify(body), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
          .set('Authorization', "Bearer " + this.token),
      }).subscribe(res => {
        resolve(res)
      }, (err) => {
        reject(err)
      });
    });
  }

  GetE15Provider(body) {
    console.log("data: ", body);
    return new Promise((resolve, reject) => {

      this.http.post(this.url + 'e15_inquery', JSON.stringify(body), {
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
