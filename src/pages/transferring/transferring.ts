import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-transferring',
  templateUrl: 'transferring.html',
})
export class TransferringPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  Ewalt() {
  console.log('Ew')
    this.navCtrl.push('CreditCardPage')
  }

  editInfo() {

  }
  local_agent(){

  }
}
