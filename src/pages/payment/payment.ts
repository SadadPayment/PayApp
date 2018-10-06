import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  AccountNumber: string = "199XXXXXX";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }


  MobilBiil() {
    this.navCtrl.push('MobileBillPage');
  }

  MobilRecharge() {
    this.navCtrl.push('MobilRechargePage');
  }

  E15Payment() {
    this.navCtrl.push('E15PaymentPage');
  }

  E15query() {
    this.navCtrl.push('E15InqueryPage');
  }
}
