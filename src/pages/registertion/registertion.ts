import {UsersProvider} from './../../providers/users/users';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Validators, FormGroup, FormControl} from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-registertion',
  templateUrl: 'registertion.html',
})
export class RegistertionPage {


  data: any;
  messages= [];

  signupform: FormGroup;
  userData = {"username": "", "phone": "", "password": "", "fullName": "", "panNumber": "", "Ipin": "", "expDate": ""};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public Usersprovider: UsersProvider,
    private toastCtrl: ToastController) {

    // }

    // ngOnInit() {
    this.signupform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(4), Validators.maxLength(10)]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
      fullName: new FormControl('', [Validators.required, Validators.pattern('([a-zA-Z ]+)'), Validators.minLength(4), Validators.maxLength(30)]),
      panNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(16), Validators.maxLength(19)]),
      Ipin: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      expDate: new FormControl('', [Validators.required])
      // email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
  }

  // ionViewDidLoad() {
  // }
  register() {

    this.Usersprovider.RegistrationProvider(this.userData).then(response => {
      this.data = response;
      console.log("Data: ", this.data);
      if (this.data.error == false) {
        this.SignupToast();
        this.navCtrl.push('ActivatePage', {phone: this.userData.phone});
      }
      if (this.data.error == true) {
        console.log("Error True: ", this.data.errors);
        let MessageContainer;
        for (let message in this.data.errors) {

          MessageContainer = this.data.errors[message];
          for (let error of MessageContainer) {
            console.log("Error True3: ", error);
            this.messages += error," \n";
          }
        }
        this.ErrorToast();
      }


    }, error => {
      this.data = error;
      console.log("Error Data: ", this.data);

    })
    // console.log(this.userData)
  }

  SignupToast() {
    let toast = this.toastCtrl.create({
      message: 'successfully',
      duration: 1000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      // console.log('Dismissed toast');
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
      // console.log('Dismissed toast');
    });

    toast.present();
  }
}
