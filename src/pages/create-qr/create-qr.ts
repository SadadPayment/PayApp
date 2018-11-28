import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-create-qr',
  templateUrl: 'create-qr.html',
})
export class CreateQrPage {
  createdCode :any;
  qrData:any;
  data:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private accPrv: AccountProvider
  ) {
  }

  ionViewDidLoad() {
    this.getBanckAccount();
  }

  createCode() {
    this.createdCode = this.qrData;
  }


  getBanckAccount(){
    let ac = localStorage.getItem('account');
    console.log('lo: ', ac);
    this.data = JSON.parse(ac);
    console.log('lo: ', this.data)
    // this.accPrv.get_bank_account_Provider()
    //   .then(data=>{
    //     this.data = data;
    //     console.log('data: ',this.data);
    //   })
    //   .catch(err=>
    //     console.log("server Error: ", err));
  }

}
