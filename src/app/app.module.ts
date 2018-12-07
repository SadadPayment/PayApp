import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';


import {StatusBar} from '@ionic-native/status-bar';
import { ComponentsModule } from '../components/components.module';
import {BackendProvider} from "../providers/backend/backend";
import {UsersProvider} from "../providers/users/users";
import { HttpClientModule } from "@angular/common/http";
import { AngularSvgIconModule } from 'angular-svg-icon';
import { E15ProcessProvider } from '../providers/e15-process/e15-process';
import {PaymentProvider} from "../providers/payment/payment";
import {HistoryPaymentProvider} from "../providers/history/HistoryPayment";
import {AccountProvider} from "../providers/users/Account";
import {SplashScreen} from "@ionic-native/splash-screen";
import { HardwareButtons } from '@scaffold-digital/ionic-hardware-buttons';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {InAppBrowser} from "@ionic-native/in-app-browser";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    AngularSvgIconModule,
    NgxQRCodeModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    BackendProvider,
    SplashScreen,
    UsersProvider,
    AccountProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    E15ProcessProvider,
    PaymentProvider,
    HardwareButtons,
    HistoryPaymentProvider,
    BarcodeScanner,
    InAppBrowser,
  ]
})
export class AppModule {
}
