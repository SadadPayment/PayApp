import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateIpinPage } from './create-ipin';

@NgModule({
  declarations: [
    CreateIpinPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateIpinPage),
  ],
})
export class CreateIpinPageModule {}
