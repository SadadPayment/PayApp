import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  AccountNumber: string = "199XXXXXX";

  constructor(public navCtrl: NavController, public navParams: NavParams,private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  ngAfterViewInit(){
    // this.app.setScrollDisabled(true);
    this.app._setDisableScroll(true)
  }
  MobilBiil() {
    this.navCtrl.push('MobilRechargePage');
  }

  ElectPay() {
    this.navCtrl.push('ElectRechargePage');
  }

  E15Payment() {
    this.navCtrl.push('E15PaymentPage');
  }

  E15query() {
    this.navCtrl.push('E15InqueryPage');
  }

  cardTrans() {
    this.navCtrl.push('CardTransfermPage')
  }

  BalanceInquiry(){
    this.navCtrl.push('BalanceInquiryPage')
  }
}
