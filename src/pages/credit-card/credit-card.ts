import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AccountProvider} from "../../providers/users/Account";

@IonicPage()
@Component({
  selector: 'page-credit-card',
  templateUrl: 'credit-card.html',
})
export class CreditCardPage {
data:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  private bankPro:AccountProvider) {
  }

  ionViewDidLoad() {
    this.getBankAccount();
  }

  getBankAccount(){
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });
    loading.present().then(()=>
    this.bankPro.get_bank_account_Provider()
      .then(data=>{
        this.data = data;
        if (localStorage.getItem('account') == null) {
          localStorage.setItem('account', JSON.stringify(this.data));
        }
        else {
          localStorage.removeItem('account');
          localStorage.setItem('account', JSON.stringify(this.data));
        }
        console.log('data: ',this.data);
        loading.dismiss();

      })
      .catch(err=> {
        console.log("server Error: ", err);
        loading.dismiss();

      })
  );
  }
  addBankAccount(){
    this.navCtrl.push('EditCreditCardPage')
  }
deleteConfirm(id){
  let alert = this.alertCtrl.create({
    title: 'تنبيه',
    message: 'هل تريد حذف هذه البطاقة ؟',
    buttons: [
      {
        text: 'الغاء',
        role: 'cancel',
        handler: () => {
        }
      },
      {
        text: 'حذف',
        handler: () => {
          this.deleteAccount(id);
          }
      }
    ]
  });
  alert.present();
}
  deleteAccount(id){
    this.bankPro.delete_bank_account_provider(id)
      .then(data=>{
        this.data = data;
        if (localStorage.getItem('account')== null) {
          localStorage.setItem('account', JSON.stringify(this.data));
        }
        else {
          localStorage.removeItem('account');
          localStorage.setItem('account', JSON.stringify(this.data));
        }
        console.log('data: ',this.data);

      })
      .catch(err=>
        console.log("server Error: ", err));
  }
}
