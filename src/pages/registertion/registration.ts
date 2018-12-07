import {UsersProvider} from '../../providers/users/users';
import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  MenuController,
  LoadingController
} from 'ionic-angular';
import {Validators, FormGroup, FormControl} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {


  data: any;
  messages = [];
  min: any;
  signupform: FormGroup;
  // userData = {"username": "", "phone": "", "password": "", "fullName": "", "panNumber": "", "Ipin": "", "expDate": ""};
  userData = {"phone": "", "password": "", "fullName": "", "panNumber": "", "Ipin": "", "expDate": ""};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public UsersProvider: UsersProvider,
    private toastCtrl: ToastController,
    public menu: MenuController) {
    this.menu.enable(false);
    this.minDate();
    // }

    // ngOnInit() {
    this.signupform = new FormGroup({
      // username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(4), Validators.maxLength(10)]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),//([a-zA-Z ]+)
      fullName: new FormControl('', [Validators.required, Validators.pattern('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z ]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_ ]*$'), Validators.minLength(4), Validators.maxLength(30)]),
      panNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(16), Validators.maxLength(19)]),
      Ipin: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      expDate: new FormControl('', [Validators.required])
      // email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
  }

  register() {
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });
    loading.present();
    this.UsersProvider.RegistrationProvider(this.userData).then(response => {
      this.data = response;
      console.log("Data: ", this.data);
      if (this.data.error == false) {
        loading.dismiss();
        this.SignupToast();
        this.navCtrl.setRoot('ActivatePage', {phone: this.userData.phone});
      }
      if (this.data.error == true) {
        loading.dismiss();
        console.log("Error True: ", this.data.errors);
        let MessageContainer;
        for (let message in this.data.errors) {

          MessageContainer = this.data.errors[message];
          for (let error of MessageContainer) {
            this.messages += error, " \t \n";
            loading.dismiss();
          }
        }
        this.ErrorToast();
        loading.dismiss();

      }

    }, error => {
      this.data = error;
      this.ServerError(error);
      loading.dismiss();
    })
  }

  SignupToast() {
    let toast = this.toastCtrl.create({
      message: 'تم التسجيل بنجاح',
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  ErrorToast() {
    let toast = this.toastCtrl.create({
      message: this.messages.toString(),
      duration: 4000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
    });
    toast.present();
  }

  ServerError(messages) {
    let toast = this.toastCtrl.create({
      message: messages.toString(),
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
