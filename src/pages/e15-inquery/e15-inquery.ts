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
  rep: string;
  data: any;
  response: any;
  transaction: any;
  PAN: any;
  newPAN: any;
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
      IPIN: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
      InvouisNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1)]),
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

  Check() {
    let body = {
      "phone": this.E15Data.Phone,
      "IPIN": this.E15Data.IPIN,
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
        console.log('data: ', this.data);
        this.errorCodeResponse();
        console.log(this.data);
        this.response = this.data.response;
        this.transaction = this.data.data;

        switch (this.data.error) {
          case (true):
            this.error();
            break;
          case (false):
            this.pass(this.data);
            break;
          default:
            this.error();
        }

        loading.dismiss();
      })
      .catch((error => {
        this.ServerError(error);
        loading.dismiss();
      }));
  }


  pass(rep) {
    let PAN = this.data.full_response.PAN;
    this.newPAN = PAN.substring(1, 6) + "*****" + PAN.substring(11, 30);

    let alert = this.alertCtrl.create({
      title: 'استعلام عن ايصال:15 ',
      subTitle:
        'نجحت العملية '
        + '<br>'
      +'رقم البطاقة: '
        + '<br>'
        + this.newPAN
        + '<br>'
        + 'الاسم: '
        + '<br>'
        + this.response.PayerName
        + '<br>'
        + ' :الرقم المرجعي'
        + '<br>'
        + this.response.ReferenceId
        + '<br>'
        + ' :رقم الهاتف'
        + '<br>'
        + this.E15Data.Phone
        + '<br>'
        + 'الحالة: '
        + this.e15Status()
        + '<br>'
        + 'التاريخ: '
        + '<br>'
        + rep.expiry
        + '<br>'
        + 'تاريخ الإنتهاء: '
        + '<br>'
        + this.response.InvoiceExpiry
        + '<br>'
        + "اسم الخدمة: "
        + '<br>'
        + this.response.ServiceName
        + '<br>'
        + 'القيمة الاجمالية: '
        + '<br>'
        + this.response.TotalAmount +" ج.س "
        + '<br>'
        + 'المطالبة المالية: '
        + '<br>'
        + this.response.DueAmount +" ج.س "
        + '<br>'
        + 'اسم الوحدة: '
        + '<br>'
        + this.response.UnitName
        + '<br>'
        + 'وقت التنفيذ: '
        + '<br>'
        + this.transaction.date.toString()
        + '<br>'
        + 'رقم العملية: '
        + this.transaction.id

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
        "<br> "
        + "رسالة الخطا: "
        + '<br>'
        + this.rep
      ,
      buttons: ['تم'],
      cssClass: 'alertTwo'
    });
    alert.present();

  }


  ServerError(error) {
    let alert = this.alertCtrl.create({
      title: 'خطأ',
      subTitle: "فشلت العملية" +
        "<br> "
        + "رسالة الخطا: "
        + '<br>'
        + error,

      buttons: ['تم'],
      cssClass: 'alertTwo'
    });
    alert.present();

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

  isFilter(PAN) {
    this.newPAN = PAN.substring(1, 6) + "*****" + PAN.substring(11, 30);
  }
}
