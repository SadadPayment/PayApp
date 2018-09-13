import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ActivatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activate',
  templateUrl: 'activate.html',
})
export class ActivatePage {

  code:any;
  phone:any;
  data:any;

  constructor(public navCtrl: NavController, public navParams: NavParams , public UsersProvider: UsersProvider) {
    
    this.phone = this.navParams.get("phone");
    console.log(this.phone);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivatePage');
  }

  activate(){
    this.UsersProvider.ActivationProvider(this.code , this.phone).then(response =>{
      this.data = response;
      console.log(this.data);
    }, error =>{
      console.log(error);
    }); 
  }

}
