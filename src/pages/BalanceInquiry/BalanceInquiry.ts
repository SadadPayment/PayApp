import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';

import {PaymentProvider} from "../../providers/payment/payment";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-BalanceInquiry',
  templateUrl: 'BalanceInquiry.html',
})
export class BalanceInquiryPage {

  Data: any;
  private Message: any;
  formData = {"IPIN": ""};
  dis = true;

  BalanceForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private payProv: PaymentProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.BalanceForm = new FormGroup({
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)])
    });
  }


  ionViewDidLoad() {
  }

  getBalance() {
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });

    loading.present();
    this.payProv.BalanceInquiryRequest(this.formData.IPIN)
      .then(data => {
        console.log(this.Message = data);
        if (this.Message.error == false) {
          this.dis = this.Message.error;
          this.presentAlert();
        }
        else if (this.Message.message == "Wrong IPIN Code") {
          this.presentEAlert();

        }
        loading.dismiss();

      })
      .catch(err => {
        console.log("errorS: ", err);
        this.presentEAlert();

        loading.dismiss();

      })
    this.BalanceForm.reset();

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'الرصيد',
      subTitle: "الرصيد المتاح هو: " +
        "<br>" +
        this.Message.balance.available +
        " :SDG" +
        "<br>" +
        "leger: " +
        "<br>" +
        this.Message.balance.leger
      ,
      buttons: ['تم'],
      cssClass: 'alertOne'
    });
    alert.present();
  }

  presentEAlert() {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle: "" +
        "<br>" +
        "<p>" +
        "خطأ في الرقم السري" +
        "<br>" +
        "</p>"

      ,
      buttons: ['تم'],
      cssClass: 'alertTwo'
    });
    alert.present();
  }


  // LodingPro() {
  //   let loading = this.loadingCtrl.create({
  //     content: 'الرجاء الإنتظار لإتمام المعاملة ...'
  //   });
  //
  //   loading.present();
  //
  //   loading.dismiss();
  //   // console.log("data ", this.salon = salon.data)
  // }

}
