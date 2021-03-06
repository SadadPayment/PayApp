import {Component, ViewChild} from '@angular/core';
import {AlertController, Nav, Platform, ToastController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from "@ionic-native/splash-screen";
import {HardwareButtons} from '@scaffold-digital/ionic-hardware-buttons';

// import {Idle, DEFAULT_INTERRUPTSOURCES} from "@ng-idle/core";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  login: any = {title: 'تسجيل/ دخول', component: 'LoginPage', icon: "log-in"};

  @ViewChild(Nav) nav: Nav;
  dataLog = localStorage.getItem('token');
  showedAlert: boolean;
  confirmAlert: any;
  rootPage: any = 'LoginPage';
  counter: number = 0;
  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    // private idle: Idle,
    private toastCtrl: ToastController,
    public splashScreen: SplashScreen,
    private hardwareButtons: HardwareButtons,
    public alertCtrl: AlertController,
  ) {
    this.initializeApp();
    // this.tiemOute();
    // used for an example of ngFor and navigation
    this.pages = [

      {title: 'الرئيسية', component: 'HomeTabsPage', icon: "md-home"},
      // { title: 'ملفي الشخصي', component: 'ProfilePage', icon: "md-person" },
      {title: 'سجل العمليات', component: 'HistoryUserPage', icon: "calendar"},
      {title: 'انشاء رقم الانترنت السري', component: 'CreateIpinPage', icon: "lock"},
      {title: 'عن التطبيق', component: 'AboutUsPage', icon: "information-circle"},

    ];

  }

  lgoOut() {
    localStorage.removeItem('token');
    this.nav.setRoot('LoginPage')
  }

  initializeApp() {

    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.statusBar.backgroundColorByHexString('#00b3d4');
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.hardwareButtons.init();
      }

      // this.backBoutton();
      // this.twoBackButton();

    });
    // this.platform.resume.subscribe(() => {
    //   console.log('[INFO] App resumed');
    // });
    this.platform.pause.subscribe(() => {
      console.log('[INFO] App Pass');
      let TIME_IN_MS = 5000;
      let hideFooterTimeout = setTimeout(() => {
        this.nav.setRoot('LoginPage')
      }, TIME_IN_MS);

    });

    // this.platform.ready().then(() => {
    //   this.platform.pause.subscribe(() => {
    //     // console.log('[INFO] App paused');
    //   });
    //
    //   this.platform.resume.subscribe(() => {
    //     // console.log('[INFO] App resumed');
    //   });
    // });


  }

  // tiemOute() {
  //   this.idle.setIdle(10);
  //   this.idle.setTimeout(5);
  //   this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
  //
  //   this.idle.onTimeoutWarning.subscribe((countdown: number) => {
  //     alert('Timeout Warning - ' + countdown);
  //   });
  //
  //   this.idle.onTimeout.subscribe(() => {
  //     alert('Timeout');
  //     localStorage.clear();
  //
  //     this.nav.setRoot('LoginPage');
  //   });
  //
  //   this.idle.watch();
  // }

  // logout() {
  //   this.idle.stop();
  //   this.idle.ngOnDestroy(); //includes this.idle.stop() and this.clearInterrupts() both.
  //   this.headerService.exit()
  //     .subscribe(
  //       data => {
  //         localStorage.clear();
  //         this.nav.setRoot('LoginPage');
  //       },
  //       error => console.log(error)
  //     )
  // }
  confirmExitApp() {
    this.showedAlert = true;
    this.confirmAlert = this.alertCtrl.create({
      title: "تنبيه",
      message: "هل تود الخروج من التطبيق ؟",
      buttons: [
        {
          text: 'الغاء',
          handler: () => {
            this.showedAlert = false;
            return;
          }
        },
        {
          text: 'خروج',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    this.confirmAlert.present();
  }

  backBoutton() {
    this.platform.registerBackButtonAction(() => {
      if (this.nav.length() == 1) {
        if (!this.showedAlert) {
          this.confirmExitApp();
        } else {
          this.showedAlert = false;
          this.confirmAlert.dismiss();
        }
      }

      this.nav.pop();
    });
  }

  twoBackButton() {
    this.platform.registerBackButtonAction(() => {
      if (this.counter == 0) {
        this.counter++;
        this.presentToast();
        setTimeout(() => {
          this.counter = 0
        }, 3000)
      } else {
        // console.log("exitapp");
        this.platform.exitApp();
      }
    }, 0)
  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Press again to exit",
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }

  openPage(page) {

    this.nav.setRoot(page.component);
  }

}
