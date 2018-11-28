import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

@IonicPage()
@Component({
  selector: 'page-get-payment-qr',
  templateUrl: 'get-payment-qr.html',
})
export class GetPaymentQrPage {
  // scannedCode :any;
  data:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner
  ) {
  }

  ionViewDidLoad() {
    this.scanCode();
  }


  scanCode() {
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });
    this.barcodeScanner.scan().then(barcodeData => {
      // this.scannedCode = barcodeData.text;
      this.data = barcodeData.text;
      loading.present();

      if (this.data){
        loading.dismiss();
        this.navCtrl.push('CardTransfermPage', {'data': this.data});
    }

    }, (err) => {
      loading.dismiss();
      console.log('Error: ', err);
    });
  }
}
