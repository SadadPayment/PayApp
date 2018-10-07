import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {E15PaymentPage} from './e15-payment';

@NgModule({
  declarations: [
    E15PaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(E15PaymentPage),
  ],
})
export class E15ReceiptPageModule {
}
