import {Component} from '@angular/core';
import {App, IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import { BackButton } from '@scaffold-digital/ionic-hardware-buttons';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(true);
  }

  ionViewDidLoad() {
  }

menue(){
  this.menuCtrl.open('')
  // this.menuCtrl.open('right');
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

  @BackButton()
  public onBackButton() {
    // alert('bak');
    this.platform.exitApp();
    return true;
  }


  openMyQr(){
    this.navCtrl.push('CreateQrPage');
  }
  openPayQr(){
    this.navCtrl.push('GetPaymentQrPage');
  }

}
