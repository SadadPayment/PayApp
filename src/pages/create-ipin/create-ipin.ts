import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';


@IonicPage()
@Component({
  selector: 'page-create-ipin',
  templateUrl: 'create-ipin.html',
})

export class CreateIpinPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private iab: InAppBrowser) {

  }


  openWebSite() {

    this.platform.ready().then(() => {
      const browser = this.iab.create('https://ebs-sd.com/ebs/vas/generateipin.php?lan=ar', '_blank', {
        location: 'no',
        zoom: 'no'
      });
      browser.show();

    });
  }

  goBack(){
    this.navCtrl.setRoot('HomeTabsPage')
  }

}
