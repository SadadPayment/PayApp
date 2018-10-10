import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {E15ProcessProvider} from "../../providers/e15-process/e15-process";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  E15Form: FormGroup;
  E15Data = {"Phone": "", "IPIN": "", "Amount":"", "InvouisNumber":""};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private e15Prov: E15ProcessProvider
  ) {
    this.E15Form = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]),
      amount: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]),
      InvouisNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(18), Validators.maxLength(18)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
    });
  }

  // ionViewDidLoad() {
  // }
  Check() {
    let body = {
      "phone": this.E15Data.Phone,
      "IPIN": this.E15Data.IPIN,
      "amount": this.E15Data.Amount,
      "invoiceNo": this.E15Data.InvouisNumber
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
