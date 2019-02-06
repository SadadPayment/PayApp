import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountProvider} from "../../providers/users/Account";
import {App} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit-credit-card',
  templateUrl: 'edit-credit-card.html',
})
export class EditCreditCardPage {
  accountData = {"PAN": "", "expDate": "", "name": ""};
  data: any;
  accountForm: FormGroup;
  min: any;

  constructor(public navCtrl: NavController,
              private app: App,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private accoPro: AccountProvider) {
    this.accountForm = new FormGroup({
      PAN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(16), Validators.maxLength(19)]),
      expDate: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.pattern(''), Validators.minLength(3), Validators.maxLength(10)]),
    });
    this.minDate();
  }

  ngAfterViewInit() {
    this.app._setDisableScroll(true);
  }

  saveCard() {
    let lod = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });
    lod.present();
    console.log('data add: ', this.accountData);
    this.accoPro.add_bank_account_Provider(this.accountData)
      .then(data => {
        console.log(data);
        if (data == true) {
          lod.dismiss();
          this.AddToast();
          this.navCtrl.push('CreditCardPage')
        }
        else {
          lod.dismiss();
          this.ErrorToast();
        }
        // console.log('data: ', data);
      })
      .catch(err => {
        lod.dismiss();
        this.ServeToast();

        // console.log('Serve Error: ', err);
      });
  }

  AddToast() {
    let toast = this.toastCtrl.create({
      message: 'تم اضافة البطاقة بنجاح',
      duration: 2000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }


  ErrorToast() {
    let toast = this.toastCtrl.create({
      message: 'خطا لم يتم اضافة البطاقة',
      duration: 2000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
    });
    toast.present();
  }

  ServeToast() {
    let toast = this.toastCtrl.create({
      message: 'حاول في وقت لاحق',
      duration: 2000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
    });
    toast.present();
  }


  minDate() {
    this.min = new Date().toISOString();
  }
}
