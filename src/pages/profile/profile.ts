import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UsersProvider} from "../../providers/users/users";


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private profilePro: UsersProvider) {
    this.getProfile();

  }

  data: any={'username':'user', 'phone':'09XXXXXXX', 'email':"", "fullName":"xxx"};

  ionViewDidLoad() {
  }

  getProfile() {
    this.profilePro.getUsersProfileProvider()
      .then(response => {
        this.data = response;
        console.log(this.data);
      })
      .catch(err => {
        console.log('error Server Side: ', err);
      })
  }
}
