import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PaymentProvider} from '../../providers/payment/payment';

@IonicPage()
@Component({
  selector: 'page-mobil-recharge',
  templateUrl: 'mobil-recharge.html',
})
export class MobilRechargePage {
  newPAN: string;
  rep: string;

  // RechargeModel: MobilePaymentModel;
  data: any;
  RechargeData = {"phone": "", "amount": "", "IPIN": "", "biller": "", "id": ""};
  RechargeForm: FormGroup;
  error: any;
  PAN: any;

  // private errorP: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private payProv: PaymentProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.RechargeForm = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.pattern('^(?:0|\\(?\\09\\)?\\s?|01\\s?)[1-79](?:[\\.\\-\\s]?\\d\\d){4}$'), Validators.minLength(10), Validators.maxLength(10)]),
      // ^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$
      id: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9 \.]*'), Validators.minLength(1)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      biller: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.maxLength(6)]),

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
    else  {
      alert('تحتاج الي اضافة بطاقة اولاً');
      this.navCtrl.push('CreditCardPage');
    }
  }

  SendRecharge() {
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });
    loading.present();
    this.payProv.TopUpRequestProvider(this.RechargeData).then(data => {
      this.data = data;
      this.errorCodeResponse();
      if (this.data.error == false) {
        this.TopUpSToast(this.data.full_response, this.data.date)
      }
      else {
        this.TopUpEToast();
      }
      loading.dismiss();
    }).catch((error => {
      this.ServerError();
      loading.dismiss();
    }));
  }


  TopUpSToast(ebs, date) {
    let blanc = "0";
    if (ebs.balance != null) {
      blanc = ebs.balance.available;
    }
    this.newPAN = ebs.PAN.substring(1, 6) + "*****" + ebs.PAN.substring(11, 30);

    let alert = this.alertCtrl.create({
      title: 'شحن الرصيد',
      subTitle:
        'تم الشحن بنجاح'
        + '<br>'
        + 'رقم البطاقة: '
        + this.newPAN
        + "<br>"
        + 'مزود الخدمة: '
        + '<br>'
        + this.RechargeData.biller
        + '<br>'
        + 'رقم الهاتف: '
        + this.RechargeData.phone
        + '<br>'
        + 'قيمة الشحن: '
        + this.RechargeData.amount +"ج.س"
        + '<br>'
        + 'الرصيد المتبقي: '
        + blanc +"ج.س"
        + '<br>'
        + "العمولة: " + ebs.acqTranFee +"ج.س"
        + '<br>'
        + 'العمولة الخارجية: ' + ebs.issuerTranFee +"ج.س"
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
    this.RechargeForm.reset();

  }


  TopUpEToast() {
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


  ServerError() {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle:
        'فشل الطلب - حاول لاحقا'
      ,
      buttons: ['تم'],
      cssClass: 'alertTwo'
    });
    alert.present();
  }

  errorCodeResponse() {
    switch (this.data.code) {
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


}
