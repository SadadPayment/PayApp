import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  login: any = { title: 'تسجيل/ دخول', component: 'LoginPage', icon: "log-in" };

  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [

      { title: 'الرئيسية', component: 'HomeTabsPage', icon: "md-home" },
      { title: 'ملفي الشخصي', component: 'ProfilePage', icon: "md-person" },
      { title: 'سجل العمليات', component: 'HistoryUserPage', icon: "calendar" },
      { title: 'عن التطبيق', component: 'AboutUsPage', icon: "information-circle" },

    ];

  }

  lgoOut() {
    localStorage.clear();
    this.nav.setRoot('LoginPage')
  }

  initializeApp() {

    this.platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString('#00bcd4');
      //Check Connation
      // this.listenConnection();
      this.statusBar.styleDefault();
    });
  }

  // private listenConnection(): void {
  //   this.network.onDisconnect()
  //     .subscribe(() => {
  //       this.showAlert();
  //     });
  // }
  // private showAlert(): void {
  //   // omitted;
  // }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
