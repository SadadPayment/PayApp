import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {PaymentProvider} from "../../providers/payment/payment";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@IonicPage()
@Component({
  selector: 'page-elect-recharge',
  templateUrl: 'elect-recharge.html',
})
export class ElectRechargePage {

  data: any;
  Message: any;
  electData = {"METER": "", "amount": "", "IPIN": "", "id": ""};
  ElectForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public electBack: PaymentProvider,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    this.ElectForm = new FormGroup({
      METER: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(11), Validators.maxLength(11)]),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9 \.]*'), Validators.minLength(1), Validators.maxLength(15)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      id: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]),

    });
  }
  PAN:any;

  ionViewDidLoad() {
    this.getBanckAccount();
  }
  getBanckAccount() {
    let ac = localStorage.getItem('account');
    this.PAN = JSON.parse(ac);
  }

  //moragaaa
  SendElectRequest() {
    console.log("electData: ", this.electData);
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });
    loading.present();
    this.electBack.ElectricityRequestProvider(this.electData).then(data => {
      console.log("data: ", data);
      this.data = data;
      if (this.data.error == false) {
        this.Message = this.data.info;
        this.presentAlert();
      }
      if (this.data.error == true) {
        this.Aerror();
      }
      loading.dismiss();
    }).catch((erorr => {
      console.log("Data Error: ", erorr);
      this.Aerror();
      loading.dismiss();
    }))
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'رقم الشحن',
      subTitle: "رقم الشحن: " +
        "<br>" +
        this.Message.token +
        "<br>" +
        "صاحب العداد: " +
        "<br>" +
        this.Message.customerName +
        "<br>" +
        "عدد الـk/w: " +
        "<br>" +
        +this.Message.unitsInKWh +
        "<br>" +
        "<br>"
      ,
      buttons: ['تم']
    });
    alert.present();
  }


  Aerror() {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle: "خطأ، الرجاء المحاولة لاحقا"
      ,
      buttons: ['تم']
    });
    alert.present();
  }
}
