import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {PaymentProvider} from "../../providers/payment/payment";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@IonicPage()
@Component({
  selector: 'page-elect-recharge',
  templateUrl: 'elect-recharge.html',
})
export class ElectRechargePage {
  newPAN: string;

  data: any;
  respnseEbs: any;
  Message: any;
  electData = {"METER": "", "amount": "", "IPIN": "", "id": ""};
  ElectForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public electBack: PaymentProvider,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    this.ElectForm = new FormGroup({
      METER: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(11), Validators.maxLength(13)]),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9 \.]*'), Validators.minLength(1)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      id: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]),

    });
  }

  PAN: any;
  rep: any;

  ionViewDidLoad() {
    this.getBancAccount();
  }

  getBancAccount() {
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

  //moragaaa
  SendElectRequest() {
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });
    loading.present();
    this.electBack.ElectricityRequestProvider(this.electData).then(data => {
      this.data = data;
      // this.respnseEbs = this.data.full_response;
      console.log(data);
      this.errorCodeResponse(this.data);
      if (this.data.error == false) {
        this.Message = this.data.info;
        this.presentAlert(this.data.full_response, this.data.date);
      }
      else if (this.data.error == true && this.data.errorCode == "72") {
        this.depitError()
      }
      else {
        this.Aerror();
      }
      loading.dismiss();
    }).catch((erorr => {
      console.log("Data Error: ", erorr);
      this.Aerror();
      loading.dismiss();
    }))
  }

  presentAlert(ebs, date) {
    let blanc = "0";
    if (ebs.balance != null) {
      blanc = ebs.balance.available;
    }
    this.newPAN = ebs.PAN.substring(1, 6) + "*****" + ebs.PAN.substring(11, 30);

    let alert = this.alertCtrl.create({
      title: 'شحن الكهرباء',
      subTitle: 'نجحت العملية'
        + '<br>'
        + "رقم الشحن: " +
        "<br>" +
        this.Message.token +
        "<br>" +
        "صاحب العداد: " +
        "<br>" +
        this.Message.customerName
        + "<br>"
        + "عدد الـk/w: "
        + "<br>"
        + this.Message.unitsInKWh
        + '<br>'
        + "عمولة الماء: "
        + "<br>"
        + this.Message.waterFees + "ج.س"
        + "<br>"
        + 'رقم البطاقة: '
        + '<br>'
        + this.newPAN
        + '<br>'
        + 'تم خصم : '
        + this.electData.amount
        + '<br>'
        + 'الرصيد المتبقي: '
        + blanc
        + '<br>'
        + "العمولة: " + ebs.acqTranFee + "ج.س"
        + '<br>'
        + 'العمولة الخارجية: ' + ebs.issuerTranFee + "ج.س"
        + '<br>'
        + '<p>وقت التنفيذ: </p>'
        + date.date.toString()
        + '<br>' +
        'رقم العملية: '
        + date.id,
      buttons: ['تم'],
      cssClass: 'alertOne'

    });
    alert.present();
  }


  Aerror() {
    let rep = this.rep;

    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle:
      rep
      ,
      buttons: ['تم'],
      cssClass: 'alertTwo'

    });
    alert.present();
  }


  depitError() {
    if (this.respnseEbs.responseCode == 72) {
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


  errorCodeResponse(ebs) {
    console.log(ebs);
    switch (ebs.errorCode) {
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
        this.rep = 'بيانات الدفع غير مقبولة-او رقم الحساب (البنكي او البطاقة) بها مشكلة';
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

}
