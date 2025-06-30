import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlipbookPage } from './flipbook';

@NgModule({
  declarations: [
    FlipbookPage,
  ],
  imports: [
    IonicPageModule.forChild(FlipbookPage),
  ],
})
export class FlipbookPageModule {}
