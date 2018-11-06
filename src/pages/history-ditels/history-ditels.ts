import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-history-ditels',
  templateUrl: 'history-ditels.html',
})
export class HistoryDitelsPage {
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log(this.data);
  }

}
