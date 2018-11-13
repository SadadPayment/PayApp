import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PaymentProvider } from '../../providers/payment/payment';

@IonicPage()
@Component({
  selector: 'page-mobil-recharge',
  templateUrl: 'mobil-recharge.html',
})
export class MobilRechargePage {

  // RechargeModel: MobilePaymentModel;
  data: any;
  RechargeData = { "phone": "", "amount": "", "IPIN": "", "biller": "" };
  RechargeForm: FormGroup;
  error: any;

  // private errorP: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private payProv: PaymentProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.RechargeForm = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.pattern('^(?:0|\\(?\\09\\)?\\s?|01\\s?)[1-79](?:[\\.\\-\\s]?\\d\\d){4}$'), Validators.minLength(10), Validators.maxLength(10)]),
      // ^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$
      amount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9 \.]*'), Validators.minLength(1), Validators.maxLength(4)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      biller: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.maxLength(6)]),

    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MobilRechargePage');
  }

  SendRecharge() {
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });
    loading.present();
    this.payProv.TopUpRequestProvider(this.RechargeData).then(data => {
      console.log(this.data = data);
      if (this.data.error == false) {
        this.TopUpSToast()
      }

      else if (this.data.error == '') {
        this.TopUpEToast(this.data.message);
      }
      loading.dismiss();
    }).catch((error => {
      console.log("Error Data: ", error);
      loading.dismiss();
    }));
  }


  TopUpSToast() {
    let alert = this.alertCtrl.create({
      title: 'نجحت العملية',
      subTitle:
        'تم الشحن بنجاح'
      ,
      buttons: ['تم'],
      cssClass: 'alertOne'
    });
    alert.present();
  }


  TopUpEToast(meassge) {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle:
        meassge
      ,
      buttons: ['تم'],
      cssClass: 'alertTwo'
    });
    alert.present();
  }

  applyCategoryFilter() {
    console.log("Filter")
  }


}
