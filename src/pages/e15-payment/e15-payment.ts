import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { E15ProcessProvider } from "../../providers/e15-process/e15-process";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-e15-payment',
  templateUrl: 'e15-payment.html',
})
export class E15PaymentPage {
  data: any;
  private Message: any;

  // E15Data = {"phone": "", "amount": "", "IPIN": "", "invoiceNo": ""};
  E15Data = { "Phone": "", "IPIN": "", "Amount": "", "InvouisNumber": "" };
  E15Form: FormGroup;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private e15Prov: E15ProcessProvider,
    private loadingCtrl: LoadingController
  ) {
    this.E15Form = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.pattern('^(?:0|\\(?\\09\\)?\\s?|01\\s?)[1-79](?:[\\.\\-\\s]?\\d\\d){4}$'), Validators.minLength(10), Validators.maxLength(10)]),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9 \.]*'), Validators.minLength(1), Validators.maxLength(15)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      InvouisNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(18), Validators.maxLength(18)]),
    });
  }

  ionViewDidLoad() {
  }

  e15Payment() {
    let body = {
      "phone": this.E15Data.Phone,
      "amount": this.E15Data.Amount,
      "IPIN": this.E15Data.IPIN,
      "invoiceNo": this.E15Data.InvouisNumber
    };
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });
    loading.present();
    this.e15Prov.PayE15Provider(body)
      .then(data => {
        this.data = data;
        console.log("DataE15: ", this.Message = this.data);
        if (this.data.error == false) {
          this.pass(this.data.message, this.data.response);

        }
        else {
          this.error();
        }
        loading.dismiss();
      })
      .catch((error => {
        console.log("Serve: ", error);
        this.error();
        loading.dismiss();
      }))
  }


  pass(message, response) {
    let alert = this.alertCtrl.create({
      title: 'نجحت العملية',
      subTitle:
        message
        +
        '<br>'
        +
        response.PayerName
        + '<br>'
        + response.ReferenceId
        + '<br>'
        + response.ServiceName
        + '<br>'
        + response.TotalAmount
        + '<br>'
        + response.UnitName
      ,
      buttons: ['تم'],
      cssClass: 'alertOne'
    });
    alert.present();
  }

  error() {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle: "فشلت العملية" +
        "<br> " +
        this.Message.message
      ,
      buttons: ['تم'],
      cssClass: 'alertTwo'
    });
    alert.present();
  }

}