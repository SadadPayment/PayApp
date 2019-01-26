import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';

import {PaymentProvider} from "../../providers/payment/payment";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-BalanceInquiry',
  templateUrl: 'BalanceInquiry.html',
})
export class BalanceInquiryPage {
  rep: any;
  newPAN: string;

  Data: any;
  data: any;
  private Message: any;
  formData = {"IPIN": "", "id": ""};
  dis = true;
  PAN: any;

  BalanceForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private payProv: PaymentProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.BalanceForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)])
    });


  }


  ionViewDidLoad() {
    this.getBankAccount();
  }

  getBalance() {
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });

    loading.present();
    this.payProv.BalanceInquiryRequest(this.formData)
      .then(data => {
        this.Message = data;
        this.data = data;
        this.data = this.data.full_response;
        this.errorCodeResponse();
        console.log('data: ', this.data);
        if (this.Message.error == false) {
          this.dis = this.Message.error;
          this.presentAlert(this.Message.full_response, this.Message.date);
          this.BalanceForm.reset();
        }

        else if (this.data.responseCode == "72") {
          this.depitError()
        }
        else {
          this.presentEAlert();
        }
        loading.dismiss();
      })
      .catch(err => {
        this.serverErrorAlert(err);
        loading.dismiss();
      });

  }

  getBankAccount() {
    let nu = "[]";
    let ac = localStorage.getItem('account');
    if (ac != nu.toString()) {
      this.PAN = JSON.parse(ac);
    }
    else {
      alert('تحتاج الي اضافة بطاقة اولاً');
      this.navCtrl.push('CreditCardPage');
    }
  }

  presentAlert(ebs, date) {
    this.newPAN = ebs.PAN.substring(1, 6) + "*****" + ebs.PAN.substring(11, 30);

    let alert = this.alertCtrl.create({
      title: 'معرفة الرصيد',
      subTitle: 'نجحت العملية'
        + '<br>'
        + "الرصيد المتاح هو: "
        + "<br>" +
        this.Message.balance.available + " :ج.س"
        + '<br>'
        + 'رقم البطاقة: '
        + '<br>'
        + this.newPAN
        + '<br>' +
        "العمولة: " + ebs.acqTranFee + "ج.س"
        + '<br>' +
        'العمولة الخارجية: ' + ebs.issuerTranFee + "ج.س"
        + '<br>'
        + '<p>وقت التنفيذ: </p>'
        + date.date.toString() + '<br>'
        + 'رقم العملية: ' + date.id,
      buttons: ['تم'],
      cssClass: 'alertOne'
    });
    alert.present();
  }

  presentEAlert() {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle:
      this.rep
      ,
      buttons: ['تم'],
      cssClass: 'alertTwo'
    });
    alert.present();
  }

  serverErrorAlert(error) {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle:
      error
      ,
      buttons: ['تم'],
      cssClass: 'alertTwo'
    });
    alert.present();
  }

  depitError() {
    if (this.data.responseCode == 72) {
      let alert = this.alertCtrl.create({
        title: 'خطأ',
        subTitle: "فشلت العملية"
          + '<br>'
          + 'لان الجهة المحول لها غير متاحة حالياً'
          + '<br>'
        ,
        buttons: ['تم'],
        cssClass: 'alertTwo'
      });
      alert.present();
    }
  }


  errorCodeResponse() {
    switch (this.data.responseCode) {
      case (11):
        this.rep = 'يجب تغير الرقم السري للبطاقة او رقم الانترنت السري';
        break;

      case (40):
        this.rep = 'رقم البطاقة المدخل تم الابلاغ عن فقدانها';
        break;

      case (41):
        this.rep = 'رقم البطاقة المدخل تم الابلاغ عن سرقتها';
        break;
      case (51):
        this.rep = 'خطا في رقم البطاقة المدخل';
        break;
      case (52):
        this.rep = 'خطا في رقم البطاقة او تاريخ الانتهاء';
        break;
      case (53):
        this.rep = 'خطا في رقم الانترنت السري المدخل';
        break;
      case (56):
        this.rep = 'بيانات الدفع غير مقبولة <br> او رقم رقم الحساب (البنكي او البطاقة) بها مشكلة';
        break;
      case (57):
        this.rep = 'المعاملة غير مدعومة بواسطة النظام أو البنك';
        break;
      case (58):
        this.rep = "حالة البطاقة - مقيدة";
        break;
      case (59):
        this.rep = 'ليس لديك رصيد كافي في البطاقة';
        break;
      case (60):
        this.rep = 'تم تجاوز حد البطاقة لهذه العملية - القيمة المدخلة اكبر اوقل من المسموح به';

        break;
      case (61):
        this.rep = 'سيتم تجاوز حد السحاب المتاح';

        break;
      case (62):
        this.rep = 'تم تجاوز الفرص المتاحة لادخال IPIN-PIN :' +
          '(الرقم السري للانترنت) خطاء اكثر من مرة';
        break;

      case (63):
        this.rep = 'حدود السحب تم الوصول إليها بالفعل';
        break;

      case (67):
        this.rep = 'المبلغ غير صحيح';
        break;

      case (68):
        this.rep = 'تم رفض الطلب من قبل مزود الخدمة' +
          '<br>' +
          ' راجع البيانات المدخلة مثل رقم الهاتف او الفاتورة';
        break;

      case (72):
        this.rep = ", تم خصم المبلغ من الحساب و تعليقه"
          + '<br>'
          + 'لان الجهة المحول لها غير متاحة حالياً';
        break;
      case (73):
        this.rep = 'خطا في رقم البطاقة';
        break;
      case (83):
        this.rep = 'تم تجاوز الفرص المتاحة لادخال IPIN-PIN :' +
          '(الرقم السري للانترنت) خطاء اكثر من مرة';
        break;
      case (609):
        this.rep = 'رقم البطاقة المحول لها غير موجود'
        break;
      case (634):
        this.rep = 'رقم الهاتف المدخل غير مطابق لرقم الهاتف المسجل مع البطاقة ';
        break;
      case (696):
        this.rep = 'النظام متوقف عن العمل حالياً ' +
          '<br>' +
          'حاول في وقت لاحق';
        break;
      case (999):
        this.rep = 'انتها وقت الاتصال ';
        break;
      default:
        this.rep = 'حاول في وقت لاحق';

    }
  }

  // isFilter(PAN) {
  //   this.newPAN = PAN.substring(1, 6) + "*****" + PAN.substring(11, 30);
  // }
}
