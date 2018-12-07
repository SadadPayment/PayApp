import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {E15ProcessProvider} from "../../providers/e15-process/e15-process";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-e15-inquery',
  templateUrl: 'e15-inquery.html',
})
export class E15InqueryPage {
  data: any;
  response: any;
  PAN: any;
  E15Form: FormGroup;
  E15Data = {"Phone": "", "IPIN": "", "Amount": "", "InvouisNumber": "", "id": ""};
  // private Message: any;
  // private ebs: any;


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
      InvouisNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(18), Validators.maxLength(30)]),
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
        console.log("data: ", this.data = data);
        this.response = this.data.response;
        if (this.data.error == false) {
          this.pass(this.data);
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
  }


  pass(rep) {
    // status: "PENDING", expiry: "2020-01-01"
    let alert = this.alertCtrl.create({
      title: 'نجحت العملية',
      subTitle:
        '<h2>الاسم: </h2>'
        + "<p>" + this.response.PayerName + "</p>"
        + '<h2>الرقم المرجعي :</h2>'
        + "<p>" + this.response.ReferenceId + "</p>"
        + '<h2>الحالة: </h2>' +
        +"<p>" + this.e15Status() + "</p>"
        + '<h2>التاريخ: </h2>' +
        +"<p>" + rep.expiry + "</p>"
        // + '<br>' +
        // "اسم الخدمة: " +
        // +response.ServiceName
        + '<h2>القيمة الاجمالية: </h2>' +
        +"<p>" + this.response.TotalAmount + "</p>"
      // '<h2>اسم الوحدة: </h2>'
      // + '<p>' + response.response.UnitName + '</p>',
      ,
      buttons: ['تم'],
      cssClass: 'alertOne'
    });
    alert.present();
    this.E15Form.reset();

  }

  error() {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle: "فشلت العملية" +
        "<br> " +
        this.data.message
        +"<br>"
        + "حالة الارسال"
        // + this.Message.ebs.responseMessage
        + "<br>" + "حالة الطلب"
      // + this.Message.ebs.responseStatus
      ,
      buttons: ['تم'],
      cssClass: 'alertTwo'
    });
    alert.present();
    // this.E15Form.reset();

  }

  e15Status() {
    if (this.data.status == 'CANCELED') {
      return 'تم الغاء';
    }
    if (this.data.status == 'PENDING') {
      return 'قيد الانتظار';
    }
    if (this.data.status == 'PAID') {
      return 'تم الدفع';
    }
    if(this.data.ebs.responseCode == 73){
      return 'خطا في رقم البطاقة';
    }
    else {
      return 'غير معروف';
    }
  }

}
