import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentPage } from './payment';
import {NgxQRCodeModule} from "ngx-qrcode2";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    PaymentPage,

  ],
  imports: [
    IonicPageModule.forChild(PaymentPage),
    NgxQRCodeModule,
    ComponentsModule
  ],
})
export class PaymentPageModule {}
