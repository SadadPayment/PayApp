import {UsersProvider} from '../../providers/users/users';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersDataModel} from "../../models/UsersModel";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  LoginForm: FormGroup;
  userData = {"phone": "", "IPIN": ""};
  data: any;
  userM :UsersDataModel;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public LoginProvider: UsersProvider,
    private toastCtrl: ToastController) {
    this.LoginForm = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      // email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
    // this.userM.IPIN;
  }


  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }
  login() {
    this.LoginProvider.LoginProvider(this.userData).then(response => {
        this.data = response;
        console.log("Data: ", this.data);
        if (this.data.error == true || 'true') {
          this.FiallLoginToast();
        }
        if (this.data.error == false || 'false') {
          localStorage.setItem('token', this.data.token);
          this.navCtrl.push('HomeTabsPage');
        }
      }, error => {
        console.log("Data: ", error);
      }
    )
  }

  Registrtion() {
    this.navCtrl.push('RegistertionPage');
  }

  LoginToast() {
    let toast = this.toastCtrl.create({
      message: 'Login successfully',
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
      duration: 1000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }
}


// error: false message: "OK"token: "ey"
