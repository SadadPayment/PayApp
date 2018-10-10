import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {PaymentProvider} from "../../providers/payment/payment";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@IonicPage()
@Component({
  selector: 'page-elect-recharge',
  templateUrl: 'elect-recharge.html',
})
export class ElectRechargePage {

  // Meter: number;
  // Amount: number;
  // Ipin: number;
  data: any;
  Message: any;
  electData = {"METER": "", "amount": "", "IPIN": ""};
  ElectForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public electBack: PaymentProvider,
              private alertCtrl: AlertController) {
    this.ElectForm = new FormGroup({
      METER: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(11), Validators.maxLength(11)]),
      amount: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),

    });
  }

  ionViewDidLoad() {
  }

  //moragaaa
  SendElectRequest() {
    console.log("electData: ", this.electData);
    this.electBack.ElectricityRequestProvider(this.electData).then(data => {
      console.log("data: ", data);
      this.data = data;
      if (this.data.error == false || 'false') {
        //Sus
        this.Message = this.data.info;
        this.presentAlert();
      }
      if (this.data.error == true || 'true') {
        //file
      }
    }).catch((erorr => {
      console.log("Data Error: ", erorr)
    }))
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'رقم الشحن',
      subTitle: "رقم الشحن: " +
        "<br>" +
        this.Message.token +
        "<br>" +
        "صحب العداد: " +
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

}
