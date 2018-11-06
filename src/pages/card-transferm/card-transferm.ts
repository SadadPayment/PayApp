import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PaymentProvider} from "../../providers/payment/payment";

@IonicPage()
@Component({
  selector: 'page-card-transferm',
  templateUrl: 'card-transferm.html',
})
export class CardTransfermPage {
  data: any;
  Message: any;
  cardInfo = {"IPIN": "", "amount": "", "to": ""};
  ElectForm: FormGroup;

  // value = "9888061010278131317";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private payProv: PaymentProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.ElectForm = new FormGroup({
      to: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(16), Validators.maxLength(19)]),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9 \.]*'), Validators.minLength(1), Validators.maxLength(15)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),

    });
  }

  ionViewDidLoad() {

  }

  sendData() {

    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });

    loading.present();
    this.payProv.CardTransferRequest(this.cardInfo)
      .then(data => {
        console.log("Data: ", this.data = data);
        this.Message = this.data;
        if (this.data.error == false) {
          this.presentAlert();
        }
        //: }
        // else if (this.data.message == "Wrong IPIN Code")
        else {
          this.presentEAlert();
        }
        console.log("data: ", this.data);
        loading.dismiss();
      })
      .catch(err => {
        this.presentEAlert();
        console.log("error: ", err);
        loading.dismiss();
      })
    this.ElectForm.reset();

  }

  // balance:
  //   available: 963942.92
  // leger: -36057.08


  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'نجحت العملية',
      subTitle: "الرصيد: " +
        "<br>" +
        this.Message.balance.available +
        "<br>" +
        this.Message.balance.leger +
        "<br>"
      ,
      buttons: ['تم'],
      cssClass: 'alertOne'
    });
    alert.present();
  }

  presentEAlert() {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle: "فشلت العملية"+
        "<br> "+
        "خطأ، الرجاء المحاولة لاحقا"
        // this.Message.message
      ,
      buttons: ['تم'],
      cssClass: 'alertTwo'
    });
    alert.present();
  }
}
