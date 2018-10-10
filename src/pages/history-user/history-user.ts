import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HistoryPaymentProvider} from "../../providers/history/HistoryPayment";


@IonicPage()
@Component({
  selector: 'page-history-user',
  templateUrl: 'history-user.html',
})
export class HistoryUserPage {

  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private historyProv: HistoryPaymentProvider) {
  }

  ionViewDidLoad() {
    console.log("Data :",this.data);
    this.getData();
  }

  getData() {
    this.historyProv.getAllHistoryProvider()
      .then(data => {
        console.log("value: ", data);
        this.data = data;
        this.data = this.data.data;
      })
      .catch(err => {
        console.log("Error: ", err);
      })
  }

}
