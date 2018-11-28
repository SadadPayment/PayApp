import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetPaymentQrPage } from './get-payment-qr';

@NgModule({
  declarations: [
    GetPaymentQrPage,
  ],
  imports: [
    IonicPageModule.forChild(GetPaymentQrPage),
  ],
})
export class GetPaymentQrPageModule {}
