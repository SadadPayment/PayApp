import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AccountProvider {
  token:any= localStorage.getItem('token');
url:string = "http://sadad.cf:8000/api/user/";
addUrl:string = this.url+'add_account';
editUrl:string = this.url+'edit_account';
getUrl:string = this.url+'list_account';
constructor(public http: HttpClient) {


}

  add_bank_account_Provider(data) {
    let body = {
      "phone": data.phone,
      "IPIN": data.IPIN
    };

    return new Promise((resolve, reject) => {

      this.http.post(this.addUrl, JSON.stringify(body), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', "Bearer " + this.token),
      }).subscribe(res => {
        resolve(res)
      }, (err) => {
        reject(err)
      });
    });
  }


  get_bank_account_Provider() {
    return new Promise((resolve, reject) => {
      this.http.get(this.getUrl, {
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
