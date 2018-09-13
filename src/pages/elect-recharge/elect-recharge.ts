import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PaymentProvider} from "../../providers/payment/payment";


@IonicPage()
@Component({
    selector: 'page-elect-recharge',
    templateUrl: 'elect-recharge.html',
})
export class ElectRechargePage {

    Meter: number;
    Amount: number;
    Ipin: number;
    data: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public electBack: PaymentProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ElectRechargePage');
    }
//moragaaa
    Send() {
        this.electBack.ElectricityRequest(this.Meter, this.Amount, this.Ipin).then(reg => {
            this.data = reg
        })
    }

}
