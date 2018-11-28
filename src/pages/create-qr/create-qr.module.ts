import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateQrPage } from './create-qr';
import {NgxQRCodeModule} from "ngx-qrcode2";

@NgModule({
  declarations: [
    CreateQrPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateQrPage),
    NgxQRCodeModule,
  ],
})
export class CreateQrPageModule {}
