import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BalanceInquiryPage} from './BalanceInquiry';

@NgModule({
  declarations: [
    BalanceInquiryPage,
  ],
  imports: [
    IonicPageModule.forChild(BalanceInquiryPage),
  ],
})
export class BalanceInquiryPageModule {
}
