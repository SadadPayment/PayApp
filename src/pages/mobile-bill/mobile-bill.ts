import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MobilePaymentModel} from "../../models/MobilePaymentModel";

@IonicPage()
@Component({
  selector: 'page-mobile-bill',
  templateUrl: 'mobile-bill.html',
})
export class MobileBillPage {
  
NetWorkType:any;
MobileNumber:any;
Data:any;
billData:any;
MobileModel:MobilePaymentModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.billData = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      // email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MobileBillPage');
  }

}
