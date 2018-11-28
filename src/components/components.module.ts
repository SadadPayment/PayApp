import {NgModule} from '@angular/core';
import { GoogleMapsComponent } from './google-maps/google-maps';
import { AppTabsComponent } from './app-tabs/app-tabs';
import {IonicModule} from "ionic-angular";
@NgModule({
	declarations: [GoogleMapsComponent,
    AppTabsComponent],
	imports: [IonicModule],
	exports: [GoogleMapsComponent,
    AppTabsComponent]
})
export class ComponentsModule {}
