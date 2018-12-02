import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PaymentProvider} from "../../providers/payment/payment";

@IonicPage()
@Component({
  selector: 'page-card-transferm',
  templateUrl: 'card-transferm.html',
})
export class CardTransfermPage {
  data: any;
  Message: any;
  cardInfo = {"IPIN": "", "amount": "", "to": "", "id": ""};
  ElectForm: FormGroup;
  cardPan: string;

  // value = "9888061010278131317";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private payProv: PaymentProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.cardPan = this.navParams.get('data');
    // this.cardPan = '21541541213541231345543';
    if (this.cardPan) {
      this.cardInfo.to = this.cardPan;
    }
    this.ElectForm = new FormGroup({
      to: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(12), Validators.maxLength(19)]),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9 \.]*'), Validators.minLength(1), Validators.maxLength(15)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      id: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]),
    });
  }

  PAN: any;

  ionViewDidLoad() {
    this.getBanckAccount();
  }

  getBanckAccount() {
    let ac = localStorage.getItem('account');
    this.PAN = JSON.parse(ac);
  }

  sendData() {

    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });

    loading.present();
    this.payProv.CardTransferRequest(this.cardInfo)
      .then(data => {
        console.log("Data: ", this.data = data);
        this.Message = this.data;
        if (this.data.error == false) {
          this.presentAlert();
        }
        else {
          this.presentEAlert();
        }
        console.log("data: ", this.data);
        loading.dismiss();
      })
      .catch(err => {
        this.presentEAlert();
        console.log("error: ", err);
        loading.dismiss();
      });

  }


  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'نجحت العملية',
      subTitle: "تم تحويل: " +
        '<p>' + this.cardInfo.amount + '</p>' +
        '<h2>الي صاحب الحسابـ</h2>' +
        '<p>' + this.cardInfo.to + '</p>' +
        '<h2>الرصيد المتبقي</h2>' +
        +'<p>' + this.Message.balance.available + ' </p>'
        + '<h2>leger</h2>'
        + '<p>' + this.Message.balance.leger + ' </p>'
      ,
      buttons: ['تم'],
      cssClass: 'alertOne'
    });
    alert.present();
    this.ElectForm.reset();

  }

  presentEAlert() {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle: `فشلت العملية<br> ${this.responsCode()}`
      // this.Message.message
      ,
      buttons: ['تم'],
      cssClass: 'alertTwo'
    });
    alert.present();
  }

  responsCode() {
    if (this.data.errorCode == 609) {
      return 'رقم البطاقة المحول لها غير موجود'
    }
    if (this.data.errorCode == 72) {
      return 'تم تعليق المبلغ - بإنتظار استلامه من قبل العميل'
    }
    return 'خطا'
  }
}
