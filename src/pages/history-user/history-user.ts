import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
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
    private historyProv: HistoryPaymentProvider,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log("Data :", this.data);
    this.getData();
  }

  getData() {
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });
    loading.present();
    this.historyProv.getAllHistoryProvider()
      .then(data => {
        console.log("value: ", data);
        this.data = data;
        this.data = this.data.data;
        loading.dismiss();
      })
      .catch(err => {
        console.log("Error: ", err);
        loading.dismiss();
      })
  }

  goBack(){
    this.navCtrl.setRoot('HomeTabsPage')
  }

  openDetails(item) {
    // this.navCtrl.push('HistoryDitelsPage', {"data": item})
  }
}
