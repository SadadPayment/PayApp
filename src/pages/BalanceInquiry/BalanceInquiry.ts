import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

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
  formData={"IPIN": ""};
  BalanceForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private payProv: PaymentProvider,
    private alertCtrl: AlertController) {
    this.BalanceForm = new FormGroup({
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
    });
    }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad MobileBillPage');
  }

  getBalance() {
    this.payProv.BalanceInquiryRequest(this.formData)
      .then(data => {
        console.log(this.Message = data);
        if (this.Message.error == false) {
          this.presentAlert();
        }
        else if (this.Message.error == true) {
          this.presentEAlert();
        }
      })
      .catch(err => {
        console.log("errorS: ", err)
      })
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'الرصيد',
      subTitle: "الرصيد المتاح: " +
        "<br>" +
        this.Message.balance.available +
        " :SDG" +
        "<br>" +
        "حاجة كدا: " +
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
      title: 'خطاء',
      subTitle: "" +
        "<br>" +
        "<span style='color:red '>" +
        "خطاء في الرقم السري" +
        "<br>" +
        "</span>"

      ,
      buttons: ['تم']
    });
    alert.present();
  }


}
