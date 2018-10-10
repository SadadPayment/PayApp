import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-test-desing',
  templateUrl: 'test-desing.html',
})
export class TestDesingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  elect() {
    this.navCtrl.push('ElectRechargePage');
  }

  e15Q() {
    this.navCtrl.push('E15InqueryPage');

  }

  e15P() {
    this.navCtrl.push('E15PaymentPage');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestDesingPage');
  }

  mob() {
    this.navCtrl.push('MobilRechargePage');
  }

  blanc() {
    this.navCtrl.push('BalanceInquiryPage');
  }
}
