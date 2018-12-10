import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class PaymentProvider {
  url = "https://sadad.cf/Api/public/api/";
  // url = "http://localhost:8000/api/";
  // url = "http://104.248.31.11:8000/api/";

  TopUpPath = "topUp";
  TopUpUrl: string;

  PaymentOrder = "payment";
  PaymentUrl: any;

  BalanceInquiry = "balance_inquiry";
  BalanceInquiryUrl: string;

  Electricity = "electricity";
  electricityUrl: string;

  CardTransfer = "cardTransfer";
  CardTransferUrl: string;

  token = localStorage.getItem('token');

  constructor(public http: HttpClient) {
    this.TopUpUrl = this.url + this.TopUpPath;
    this.electricityUrl = this.url + this.Electricity;
    this.PaymentUrl = this.url + this.PaymentOrder;
    this.BalanceInquiryUrl = this.url + this.BalanceInquiry;
    this.CardTransferUrl = this.url + this.CardTransfer;
  }


  TopUpRequestProvider(data) {

    let body = {
      'phone': data.phone,
      'biller': data.biller,
      'amount': data.amount,
      'IPIN': data.IPIN,
      'id': data.id
    };

    return new Promise((resolve, reject) => {

      this.http.post(this.TopUpUrl, JSON.stringify(body), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
          .set('Authorization', "Bearer " + this.token),
      }).subscribe(res => {
        resolve(res)
      }, (err) => {
        reject(err)
      });
    });


  }

  PaymentOrderRequest(service) {


    return new Promise((resolve, reject) => {

      this.http.post(this.PaymentUrl, {service}, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
          .set('Authorization', "Bearer " + this.token),
      }).subscribe(res => {
        resolve(res)
      }, (err) => {
        reject(err)
      });
    });
  }

  BalanceInquiryRequest(data) {

    return new Promise((resolve, reject) => {
      this.http.post(this.BalanceInquiryUrl, JSON.stringify(data), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
          .set('Authorization', "Bearer " + this.token),
      }).subscribe(res => {
        resolve(res)
      }, (err) => {
        reject(err)
      });
    });
  }

  ElectricityRequestProvider(data) {
    let body = {
      'meter': data.METER,
      'amount': data.amount,
      'IPIN': data.IPIN,
      'id': data.id
    };
    return new Promise((resolve, reject) => {
      this.http.post(this.electricityUrl, JSON.stringify(body), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
          .set('Authorization', "Bearer " + this.token),
      }).subscribe(res => {
        resolve(res)
      }, (err) => {
        reject(err)
      });
    });
  }


  CardTransferRequest(data) {
    console.log("data: ", data);

    let cardInfo = {
      'to': data.to,
      'amount': data.amount,
      'IPIN': data.IPIN,
      'id': data.id

    };

    return new Promise((resolve, reject) => {

      this.http.post(this.CardTransferUrl, JSON.stringify(cardInfo), {
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
