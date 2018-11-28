import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-transferring',
  templateUrl: 'transferring.html',
})
export class TransferringPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
  }
  menue(){
    this.menuCtrl.open('right');
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
