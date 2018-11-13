import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    private bankPro:AccountProvider) {
  }

  ionViewDidLoad() {
    this.getBanckAccount();
    console.log("after Get")
  }

  getBanckAccount(){
    this.bankPro.get_bank_account_Provider()
      .then(data=>{
        this.data = data;
        console.log('data: ',this.data);
      })
      .catch(err=>
      console.log("server Error: ", err));
  }

}
