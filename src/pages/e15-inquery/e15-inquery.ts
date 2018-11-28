import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { E15ProcessProvider } from "../../providers/e15-process/e15-process";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-e15-inquery',
  templateUrl: 'e15-inquery.html',
})
export class E15InqueryPage {
  // Phone: number;
  // Ipin: number;
  // Amount: number;
  // InvouisNumber: number;
  data: any;
  PAN:any;
  E15Form: FormGroup;
  E15Data = { "Phone": "", "IPIN": "", "Amount": "", "InvouisNumber": "", "id":"" };
  private Message: any;
  private ebs: any;


  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private e15Prov: E15ProcessProvider,
    private loadingCtrl: LoadingController
  ) {
    this.E15Form = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.pattern('^(?:0|\\(?\\09\\)?\\s?|01\\s?)[1-79](?:[\\.\\-\\s]?\\d\\d){4}$'), Validators.minLength(10), Validators.maxLength(10)]),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9 \.]*'), Validators.minLength(1), Validators.maxLength(15)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      InvouisNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(18), Validators.maxLength(18)]),
      id: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]),
    });
  }

  ionViewDidLoad() {
    this.getBanckAccount();
  }
  getBanckAccount() {
    let ac = localStorage.getItem('account');
    this.PAN = JSON.parse(ac);
  }
  Check() {
    let body = {
      "phone": this.E15Data.Phone,
      "IPIN": this.E15Data.IPIN,
      "amount": this.E15Data.Amount,
      "invoiceNo": this.E15Data.InvouisNumber,
      "id": this.E15Data.id
    };
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });
    loading.present();
    this.e15Prov.GetE15Provider(body)
      .then(data => {
        this.data = data;
        console.log("DataE15: ", this.data);
        this.Message = this.data;
        if(this.Message.ebs.responseMessage){
        this.ebs = this.Message.ebs.responseMessage;
        
        console.log("ebs: ", this.ebs);
        console.log("ebs: full ", this.Message.ebs);
        }
        if (this.data.error == false) {
          this.pass(this.data.message, this.data.response);
        }
        else {
          this.error();
        }
        loading.dismiss();
      })
      .catch((error => {
        console.log("Serve: ", error);
        this.error();
        loading.dismiss();
      }));
    this.E15Form.reset();
  }



  pass(message, response) {
    let alert = this.alertCtrl.create({
      title: 'نجحت العملية',
      subTitle:
        '<br>'
        +
        "الاسم: " +
        response.PayerName
        + '<br>' +
        "الرقم المرجعي : " +
        + response.ReferenceId
        + '<br>' +
        "اسم الخدمة: " +
        + response.ServiceName
        + '<br>' +
        "القيمة الاجمالية: " +
        + response.TotalAmount
        + '<br>' +
        "اسم الوحدة: "
        + response.UnitName,
      buttons: ['تم'],
      cssClass: 'alertOne'
    });
    alert.present();
  }

  error() {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle: "فشلت العملية" +
        "<br> " +
        this.Message.message +
        "<br> "
        
      // this.ebs
      ,
      buttons: ['تم'],
      cssClass: 'alertTwo'
    });
    alert.present();
  }

}
