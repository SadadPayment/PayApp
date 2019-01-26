import {Component} from '@angular/core';
import {App, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-transferring',
  templateUrl: 'transferring.html',
})
export class TransferringPage {

  constructor(
    private app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
  }

  menue() {
    this.menuCtrl.open('right');
  }

  Ewalt() {
    console.log('Ew')
    this.navCtrl.push('CreditCardPage')
  }

  editInfo() {

  }

  local_agent() {

  }

  cleardata_and_Logout() {
    localStorage.clear();
    // this.displayTab(true)
    // this.navCtrl.setRoot('LoginPage');
    this.app.getRootNav().setRoot('LoginPage');

  }

  // private displayTab(display: boolean) {
  //   let elements = document.querySelectorAll(".tabbar");
  //
  //   if (elements != null) {
  //     Object.keys(elements).map((key) => {
  //       elements[key].style.transform = display ? 'translateY(0)' : 'translateY(56px)';
  //     });
  //   }
  // }
}
