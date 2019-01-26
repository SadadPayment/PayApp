import {UsersProvider} from '../../providers/users/users';
import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-activate',
  templateUrl: 'activate.html',
})
export class ActivatePage {

  code: any;
  phone: any;
  data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public UsersProvider: UsersProvider,
    public menu: MenuController) {
    this.menu.enable(false);
    this.phone = this.navParams.get("phone");
  }


  activate() {
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });

    loading.present();
    this.UsersProvider.ActivationProvider(this.code, this.phone).then(response => {
      this.data = response;
      if (this.data.error == false) {
        loading.dismiss();
        this.PassAlert();
        this.navCtrl.setRoot('LoginPage')
      }
      else {
        loading.dismiss();
        this.ErrorAlert();
      }
    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }


  PassAlert() {
    let alert = this.alertCtrl.create({
      title: 'نجاح',
      subTitle: "تم تفعيل الحساب بنجاح"
      ,
      buttons: ['تم'],
      cssClass: 'alertOne'
    });
    alert.present();
  }


  ErrorAlert() {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle: "" +
        "<br>" +
        "<p>" +
        "رمز التاكيد المدخل غير مطابق" +
        "<br>" +
        "</p>"

      ,
      buttons: ['تم'],
      cssClass: 'alertTwo'
    });
    alert.present();
  }


}
