import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryUserPage } from './history-user';

@NgModule({
  declarations: [
    HistoryUserPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryUserPage),
  ],
})
export class HistoryUserPageModule {}
