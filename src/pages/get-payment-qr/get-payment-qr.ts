import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {BackButton} from "@scaffold-digital/ionic-hardware-buttons";

@IonicPage()
@Component({
  selector: 'page-get-payment-qr',
  templateUrl: 'get-payment-qr.html',
})
export class GetPaymentQrPage {
  // scannedCode :any;
  data: any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner
  ) {
  }

  ionViewDidLoad() {
  }


  scanCodeToCard() {
    // let loading = this.loadingCtrl.create({
    //   content: 'الرجاء الإنتظار لإتمام المعاملة'
    // });
    this.barcodeScanner.scan().then(barcodeData => {
      this.data = barcodeData.text;
      // loading.present();
      if (this.data) {
        // loading.dismiss();
        this.navCtrl.push('CardTransfermPage', {'data': this.data});
      }

    }, (err) => {
      // loading.dismiss();
      console.log('Error: ', err);
    });
  }
  scanCodeToPurchase() {

    this.barcodeScanner.scan().then(barcodeData => {
      this.data = barcodeData.text;
      if (this.data) {
        this.navCtrl.push('PurchasePage', {'data': this.data});
      }
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  @BackButton()
  public onBackButton() {
    // let loading = this.loadingCtrl.create({
    //   content: 'الرجاء الإنتظار لإتمام المعاملة'
    // });
    // loading.dismissAll();
    // return true;
  }

}
