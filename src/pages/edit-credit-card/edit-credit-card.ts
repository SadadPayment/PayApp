import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountProvider } from "../../providers/users/Account";
import { App } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit-credit-card',
  templateUrl: 'edit-credit-card.html',
})
export class EditCreditCardPage {
  accountData = { "IPIN": "", "PAN": "", "expDate": "", "name": "" };
  data: any;
  accountForm: FormGroup;
  min: any;
  constructor(public navCtrl: NavController,
    private app: App,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private accoPro: AccountProvider) {
    this.accountForm = new FormGroup({
      PAN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(16), Validators.maxLength(19)]),
      expDate: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.pattern('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$'), Validators.minLength(4), Validators.maxLength(10)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
    });
  }

  ngAfterViewInit() {
    this.app._setDisableScroll(true);
  }

  saveCard() {
    console.log('data add: ', this.accountData);
    this.accoPro.add_bank_account_Provider(this.accountData)
      .then(data => {
        if (data == true) {
          this.AddToast();
          this.navCtrl.push('CreditCardPage')
        }
        else {
          this.ErrorToast();
        }
        console.log('data: ', data);
      })
      .catch(err => {
        console.log('Serve Error: ', err);
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

  minDate() {
    this.min = new Date().toISOString();
  }
}
