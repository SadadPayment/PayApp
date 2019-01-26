import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {PaymentProvider} from "../../providers/payment/payment";

@IonicPage()
@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html',
})
export class PurchasePage {
  newPAN: string;
  data: any;
  rep: any;
  serviceProviderId: string;
  serviceProviderIdFromQr: string;
  errorCode: any;
  // Message: any;
  PAN: any;
  PurchaseInfo = {"IPIN": "", "tranAmount": "", "serviceProviderId": "", "id": ""};
  PurchaseForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    private payment: PaymentProvider,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) {
    this.serviceProviderIdFromQr = this.navParams.get('data');
    // this.cardPan = '21541541213541231345543';
    if (this.serviceProviderIdFromQr) {
      this.PurchaseInfo.serviceProviderId = this.serviceProviderIdFromQr;
      this.serviceProviderId = this.serviceProviderIdFromQr
    }

    this.PurchaseForm = new FormGroup({
      serviceProviderId: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]),
      tranAmount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9 \.]*'), Validators.minLength(1), Validators.maxLength(15)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      id: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]),
    });
  }

  ionViewDidLoad() {
    this.getBanckAccount();
  }

  getBanckAccount() {
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

  sendPurchaseRequest() {
    console.log(this.PurchaseInfo);
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });
    loading.present();
    this.payment.PurchaseProvider(this.PurchaseInfo)
      .then(data => {
        this.data = data;
        // this.Message = this.data;
        this.errorCode = this.data.ebs.responseCode;
        this.errorCodeResponse();
        if (this.data.error == false) {
          this.presentAlert(this.data.data, this.data.ebs);
        }
        else if (this.data.error == true && this.errorCode == "72") {
          this.depitError()
        }
        else {
          this.presentEAlert();
        }

        loading.dismiss();
      })
      .catch(err => {
        this.presentEAlert();
        console.log("error: ", err);
        loading.dismiss();
      });
  }


  depitError() {
    if (this.errorCode == 72) {
      let alert = this.alertCtrl.create({
        title: 'خطأ',
        subTitle: "فشلت العملية" +
          ", تم خصم المبلغ من الحساب و تعليقه"
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

  //
  // isFilter(PAN) {
  //   this.newPAN = PAN.substring(1, 6) + "*****" + PAN.substring(11, 30);
  // }

  presentAlert(date, ebs) {
    let blanc = "0";
    if (ebs.balance != null) {
      blanc = ebs.balance.available;
    }
    this.newPAN = ebs.PAN.substring(1, 6) + "*****" + ebs.PAN.substring(11, 30);

    let alert = this.alertCtrl.create({
      title: 'شراء',
      subTitle: 'نجحت العملية'
        + '<br>'
        + "تم تحويل: "
        + this.PurchaseInfo.tranAmount + ' ج.س '
        + '<br>'
        + 'من البطاقة: '
        + '<br>'
        + this.newPAN
        + '<br>'
        + 'الي صاحب الحسابـ: '
        + this.PurchaseInfo.serviceProviderId
        + '<br>'
        + 'الرصيد المتبقي: '
        + blanc + "ج.س"
        + '<br>'
        + "العمولة: " + ebs.acqTranFee + "ج.س"
        + '<br>'
        + 'العمولة الخارجية: ' + ebs.issuerTranFee + "ج.س"
        + '<br>'
        + '<p>وقت التنفيذ: </p>'
        + date.date.toString()
        + '<br>' +
        'رقم العملية: '
        + date.id
      ,
      buttons: ['تم'],
      cssClass: 'alertOne'
    });
    alert.present();
    this.PurchaseForm.reset();

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


  errorCodeResponse() {
    switch (this.errorCode) {
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
        this.rep = 'رقم البطاقة المحول لها غير موجود';
        break;
      case (634):
        this.rep = 'رقم الهاتف المدخل غير مطابق لرقم الهاتف المسجل مع البطاقة ';
        break;
      case (661):
        this.rep = 'معلومات الخدمة غير صالحة';
        break;
      case (662):
        this.rep = 'رقم البائع غير صحيح';
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


}
