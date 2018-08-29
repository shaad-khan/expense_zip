import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NModalPage } from './nmodal';

@NgModule({
  declarations: [
    NModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NModalPage),
  ],
})
export class NModalPageModule {}
