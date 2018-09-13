import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobilRechargePage } from './mobil-recharge';

@NgModule({
  declarations: [
    MobilRechargePage,
  ],
  imports: [
    IonicPageModule.forChild(MobilRechargePage),
  ],
})
export class MobilRechargePageModule {}
