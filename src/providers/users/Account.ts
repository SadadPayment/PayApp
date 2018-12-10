import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AccountProvider {
  token: any = localStorage.getItem('token');
url:string = "https://sadad.cf/Api/public/api/user/";
//   url = "http://104.248.31.11:8000/api/user/";
// url:string = "http://localhost:8000/api/user/";
  addUrl: string = this.url + 'add_account';
  editUrl: string = this.url + 'edit_account';
  getUrl: string = this.url + 'list_account';
  deleteUrl: string = this.url + 'delete_account/';

  constructor(public http: HttpClient) {


  }

  add_bank_account_Provider(data) {

    return new Promise((resolve, reject) => {

      this.http.post(this.addUrl, JSON.stringify(data), {
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

  delete_bank_account_provider(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.deleteUrl + id, {
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
