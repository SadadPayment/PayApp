import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class UsersProvider {
  token = localStorage.getItem('token');
  url = "http://sadad.cf:8000/api";
  // url = "http://localhost:8000/api";
  urlLogin = "/login";
  urlRegs = "/register";
  urlActivation = "/activate";
  LoginPath: string;
  RegPath: string;
  ActivationPath: string;
  getProfileUrl: string;


  constructor(public http: HttpClient) {
    this.LoginPath = this.url + this.urlLogin;
    this.RegPath = this.url + this.urlRegs;
    this.ActivationPath = this.url + this.urlActivation;
    // this.getProfileUrl = this.url + '/user/profile';
    this.getProfileUrl = this.url + '/user/profile';

  }


  LoginProvider(data) {
    let body = {
      "phone": data.phone,
      "password": data.password
    };

    return new Promise((resolve, reject) => {

      this.http.post(this.LoginPath, JSON.stringify(body), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(res => {
        resolve(res)
      }, (err) => {
        reject(err)
      });
    });


  }

  // RegistrationProvider(fullName, userName, phone, password, panNumber, Ipin, expDate) {
  RegistrationProvider(data) {
    // console.log("data to Provider: " + data.panNumber)
    console.log("data to Provider: " + data.fullName)
    let body = {
      "fullName": data.fullName,
      "userName": data.username,
      "phone": data.phone,
      "password": data.password,
      "PAN": data.panNumber,
      "IPIN": data.Ipin,
      "expDate": data.expDate
    };
    return new Promise((resolve, reject) => {
      this.http.post(this.RegPath, JSON.stringify(body), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
          .set('Authorization', "Bearer " + this.token),
      }).subscribe(res => {
        resolve(res)
      }, (err) => {
        reject(err)
      });
    });


  }

  ActivationProvider(code, phone) {
    let body = {
      'phone': phone,
      'code': code

    };
    return new Promise((resolve, reject) => {
      this.http.post(this.ActivationPath, JSON.stringify(body), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(res => {
        resolve(res)
      }, (err) => {
        reject(err)
      });
    });

  }


  getUsersProfileProvider() {
    return new Promise((resolve, reject) => {
      this.http.get(this.getProfileUrl, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }).subscribe(res => {
        resolve(res)
      }, (err) => {
        reject(err)
      });
    });
  }

}
