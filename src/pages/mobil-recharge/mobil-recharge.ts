import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MobilePaymentModel } from "../../models/MobilePaymentModel";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PaymentProvider } from '../../providers/payment/payment';

@IonicPage()
@Component({
  selector: 'page-mobil-recharge',
  templateUrl: 'mobil-recharge.html',
})
export class MobilRechargePage {

  RechargeModel: MobilePaymentModel;
  data: any;
  RechargeData = { "phone": "", "amount": "", "IPIN": "", "biller": "" };
  RechargeForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private payProv: PaymentProvider) {
    this.RechargeForm = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]),
      amount: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1), Validators.maxLength(4)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      biller: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(4), Validators.maxLength(6)]),

    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MobilRechargePage');
  }

  SendRecharge() {
    this.payProv.TopUpRequestProvider(this.RechargeData).then(data => {
      console.log(this.data = data);
      if (this.data.error == false || "false") {
        this.TopUpSToast
      }

      if (this.data.error == true || "true") {
        this.TopUpEToast
      }
    }).catch((error => {
      console.log("Error Data: ", error)
    }))
  }

  TopUpSToast() {
    let toast = this.toastCtrl.create({
      message: 'chgarge successfully',
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }

  TopUpEToast() {
    let toast = this.toastCtrl.create({
      message: 'Unsuccessfully',
      duration: 2000,
      position: 'midll'
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }
}
