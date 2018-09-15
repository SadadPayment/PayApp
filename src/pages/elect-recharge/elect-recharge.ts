import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentProvider } from "../../providers/payment/payment";


@IonicPage()
@Component({
    selector: 'page-elect-recharge',
    templateUrl: 'elect-recharge.html',
})
export class ElectRechargePage {

    // Meter: number;
    // Amount: number;
    // Ipin: number;
    data: any;
    electData = { "METER": "", "amount": "", "IPIN": "" }

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public electBack: PaymentProvider) {
    }

    ionViewDidLoad() {
    }
    //moragaaa
    SendElectRequest() {
        this.electBack.ElectricityRequestProvider(this.electData).then(data => {
            if (this.data.error == false || 'false') {
                //Sus
            }
            if (this.data.error == true || 'true') {
                //file
            }
        }).catch((erorr => {
            console.log("Data Error: ", erorr)
        }))
    }

}
