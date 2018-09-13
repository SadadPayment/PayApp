import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-e15-receipt',
  templateUrl: 'e15-receipt.html',
})
export class E15ReceiptPage {
BillNumber:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad E15ReceiptPage');
  }

  Check(){
    console.log("Number: ", this.BillNumber);
  }

}
