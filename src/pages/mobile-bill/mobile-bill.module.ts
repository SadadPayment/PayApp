import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobileBillPage } from './mobile-bill';

@NgModule({
  declarations: [
    MobileBillPage,
  ],
  imports: [
    IonicPageModule.forChild(MobileBillPage),
  ],
})
export class MobileBillPageModule {}
