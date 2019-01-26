import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {E15ProcessProvider} from "../../providers/e15-process/e15-process";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-e15-payment',
  templateUrl: 'e15-payment.html',
})
export class E15PaymentPage {
  newPAN: string;
  // transaction: any;
  data: any;
  rep: any;
  // private Message: any;

  E15Data = {"Phone": "", "IPIN": "", "Amount": "", "InvouisNumber": "", "id": ""};
  E15Form: FormGroup;
  PAN: any;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private e15Prov: E15ProcessProvider,
    private loadingCtrl: LoadingController
  ) {
    this.E15Form = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^(?:0|\\(?\\09\\)?\\s?|01\\s?)[1-79](?:[\\.\\-\\s]?\\d\\d){4}$'), Validators.minLength(10), Validators.maxLength(10)]),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9 \.]*'), Validators.minLength(1), Validators.maxLength(15)]),
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      // InvouisNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(18), Validators.maxLength(30)]),
      InvouisNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]),
    });
  }

  ionViewDidLoad() {
    this.getBanckAccount();
  }



  e15Payment() {
    let body = {
      "phone": this.E15Data.Phone,
      "amount": this.E15Data.Amount,
      "IPIN": this.E15Data.IPIN,
      "invoiceNo": this.E15Data.InvouisNumber,
      "id": this.E15Data.id
    };
    let loading = this.loadingCtrl.create({
      content: 'الرجاء الإنتظار لإتمام المعاملة'
    });
    loading.present();
    this.e15Prov.PayE15Provider(body)
      .then(data => {
        this.data = data;
        this.errorCodeResponse();
        console.log('data', this.data);
        if (this.data.error == false) {
          this.pass(this.data.response, this.data.data, this.data.ebs);
        }
        else if (this.data.error == true && this.data.ebs.responseCode == "72") {
          this.depitError()
        }

        else {
          this.error();
        }
        loading.dismiss();
      })
      .catch((error => {
        // console.log("Serve: ", error);
        this.error();
        loading.dismiss();
      }))
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

  pass(response, transaction, ebs) {
    this.newPAN = ebs.PAN.substring(1, 6) + "*****" + ebs.PAN.substring(11, 30);

    let alert = this.alertCtrl.create({
      title: 'دفع ايصال: 15',
      subTitle:
        'تمت العملية بنجاح'
        + '<br>' +
      "الاسم: "
        +'<br>' +
        response.PayerName
        + '<br>' +
        "الرقم المرجعي : "
        + response.ReferenceId
        + '<br>' +
        "اسم الخدمة: "
        + response.ServiceName
        + '<br>' +
        "رقم البطاقة: "
        + this.newPAN
        + '<br>' +
        "القيمة الاجمالية: "
        + response.TotalAmount + " ج.س "
        + '<br>' +
        "العمولة: " + ebs.acqTranFee + " ج.س "
        + '<br>' +
        'العمولة الخارجية: ' + ebs.issuerTranFee + " ج.س "
        + '<br>' +
        "اسم الوحدة: "
        + response.UnitName
        + '<p>وقت التنفيذ: </p>'
        + transaction.date.toString()
        + '<br>' +
        '<p>رقم العملية: </p>' +
        transaction.id
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
      subTitle: "فشلت العملية"
        + "<br> "
        + this.rep
      ,
      buttons: ['تم'],
      cssClass: 'alertTwo'
    });
    alert.present();
  }

  errorCodeResponse() {
    switch (this.data.ebs.responseCode) {
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

  depitError() {
    if (this.data.ebs.responseCode == 72) {
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
}
