import {UsersProvider} from '../../providers/users/users';
import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, MenuController} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountProvider} from "../../providers/users/Account";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  LoginForm: FormGroup;
  userData = {"phone": "", "password": ""};
  data: any;
  account:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private bankPro:AccountProvider,
    public LoginProvider: UsersProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public menu: MenuController) {
      this.menu.enable(false);

    this.LoginForm = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.pattern('^(?:0|\\(?\\09\\)?\\s?|01\\s?)[1-79](?:[\\.\\-\\s]?\\d\\d){4}$'), Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    });
    let to = localStorage.getItem('token');
    if (to != null) {
      this.navCtrl.setRoot('HomeTabsPage')
    }
    else {
      // alert('login');
    }
  }

//0969036783

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }
  login() {
    let lod = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });
    lod.present();

    this.LoginProvider.LoginProvider(this.userData).then(response => {
        console.log("data: ", this.data = response);
        if (this.data.error == true) {
          this.FiallLoginToast();
          lod.dismiss();
          console.log("mesg: ", this.data.message);
        }
        else if (this.data.error == false) {
          lod.dismiss();
          localStorage.setItem('token', this.data.token);
          this.bankPro.get_bank_account_Provider()
            .then(data=>{
              this.account = data;
              if (localStorage.getItem('account') == null) {
                localStorage.setItem('account', JSON.stringify(this.account));
              }
              else {
                localStorage.removeItem('account');
                localStorage.setItem('account', JSON.stringify(this.account));
              }
              console.log('data: ',this.account);
              lod.dismiss();

            })
            .catch(err=> {
              console.log("server Error: ", err);
              lod.dismiss();

            });
          this.navCtrl.setRoot('HomeTabsPage');
          this.LoginToast()
        }
      }, error => {
        lod.dismiss();
        this.FiallLoginToast();
        console.log("Data: ", error);
      }
    )
  }

  Registrtion() {
    this.navCtrl.push('RegistertionPage');
  }

  LoginToast() {
    let toast = this.toastCtrl.create({
      message: 'تم تسجيل الدخول بنجاح',
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }


  FiallLoginToast() {
    let toast = this.toastCtrl.create({
      message: this.data.message,
      duration: 5000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }
}


// error: false message: "OK"token: "ey"
