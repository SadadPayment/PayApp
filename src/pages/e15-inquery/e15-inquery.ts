import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {E15ProcessProvider} from "../../providers/e15-process/e15-process";

@IonicPage()
@Component({
  selector: 'page-e15-inquery',
  templateUrl: 'e15-inquery.html',
})
export class E15InqueryPage {
  Phone: number;
  Ipin: number;
  Amount: number;
  InvouisNumber: number;
  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private e15Prov: E15ProcessProvider
  ) {
  }

  // ionViewDidLoad() {
  // }
  Check() {
    let body = {
      "phone": this.Phone,
      "IPIN": this.Ipin,
      "amount": this.Amount,
      "invoiceNo": this.InvouisNumber
    };
    this.e15Prov.GetE15Provider(body)
      .then(data => {
        this.data = data;
        console.log("DataE15: ", this.data)
      })
      .catch((error => {
        console.log("Serve: ", error);
      }))
  }
}
