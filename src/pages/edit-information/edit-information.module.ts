import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditInformationPage } from './edit-information';

@NgModule({
  declarations: [
    EditInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(EditInformationPage),
  ],
})
export class EditInformationPageModule {}
