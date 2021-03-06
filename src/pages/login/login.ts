import { UsersProvider } from '../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from "@angular/forms";
// import { AccountProvider } from "../../providers/users/Account";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  LoginForm: FormGroup;
  userData = { "phone": "", "password": "" };
  data: any;
  account: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public LoginProvider: UsersProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public menu: MenuController) {
    this.menu.enable(false);

    this.LoginForm = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.pattern('^(?:0|\\(?\\09\\)?\\s?|01\\s?)[1-79](?:[\\.\\-\\s]?\\d\\d){4}$'), Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    });
    // let to = localStorage.getItem('token');
    // if (to != null) {
    //   this.navCtrl.setRoot('HomeTabsPage')
    // }
    // else {
    // }
  }

  login() {
    let lod = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });
    lod.present();

    this.LoginProvider.LoginProvider(this.userData).then(response => {
      this.data = response;
      this.account = this.data.account;
      if (this.data.error == true) {
        this.FiallLoginToast();
        lod.dismiss();
        //console.log("mesg: ", this.data.message);
      }
      else if (this.data.error == false) {
        lod.dismiss();
        if (localStorage.getItem('account') == null) {
          localStorage.setItem('account', JSON.stringify(this.account));
        }
        else {
          localStorage.removeItem('account');
          localStorage.setItem('account', JSON.stringify(this.account));
        }
        localStorage.setItem('token', this.data.token);
        this.navCtrl.setRoot('HomeTabsPage');
        // this.LoginToast()
      }
    }, error => {
      lod.dismiss();
      this.FiallLoginToast();
      // console.log("Data: ", error);
    }
    );
  }

  Registrtion() {
    this.navCtrl.push('RegistrationPage');
  }

  FiallLoginToast() {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle: this.data.message
      ,
      buttons: ['موافق']
    });
    alert.present();
  }
}
