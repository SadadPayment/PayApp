import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PaymentProvider} from "../../providers/payment/payment";

@IonicPage()
@Component({
  selector: 'page-card-transferm',
  templateUrl: 'card-transferm.html',
})
export class CardTransfermPage {
  rep: any;
  data: any;
  errorCode: any;
  Message: any;
  cardInfo = {"IPIN": "", "amount": "", "to": "", "id": ""};
  ElectForm: FormGroup;
  cardPan: string;

  // value = "9888061010278131317";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private payProv: PaymentProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.cardPan = this.navParams.get('data');
    // this.cardPan = '21541541213541231345543';
    if (this.cardPan) {
      this.cardInfo.to = this.cardPan;
    }
    this.ElectForm = new FormGroup({
      to: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(12), Validators.maxLength(30)]),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9 \.]*'), Validators.minLength(1), Validators.maxLength(15)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      id: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]),
    });
  }

  PAN: any;
  newPAN: any;

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

  sendData() {
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });

    loading.present();
    this.payProv.CardTransferRequest(this.cardInfo)
      .then(data => {
        this.data = data;
        console.log("rep: ", data);
        this.Message = this.data;
        this.errorCode = this.data.errorCode;
        this.errorCodeResponse();
        if (this.data.error == false) {
          this.presentAlert(this.data.date, this.data.full_response);
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

  presentAlert(date, ebs) {
    let blanc = "0";
    if (this.Message.balance != null) {
      blanc = this.Message.balance.available;
    }

    let alert = this.alertCtrl.create({
      title: 'تحويل الي بطاقة',
      subTitle: 'نجحت العملية'
        + '<br>'
        + "تم تحويل: "
        + this.cardInfo.amount + ' ج.س '
        + '<br>'
        + 'من البطاقة: '
        + '<br>'
        + this.newPAN
        + '<br>'
        + 'الي صاحب الحسابـ: '
        + this.cardInfo.to
        + '<br>'
        + 'الرصيد المتبقي: '
        + blanc
        + '<br>'
        + "العمولة: " + ebs.acqTranFee + " ج.س "
        + '<br>'
        + 'العمولة الخارجية: ' + ebs.issuerTranFee + " ج.س "
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
    this.ElectForm.reset();

  }

  presentEAlert() {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle:
      // 'error'
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
