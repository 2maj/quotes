import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CitationPage } from './citation';

@NgModule({
  declarations: [
    CitationPage,
  ],
  imports: [
    IonicPageModule.forChild(CitationPage),
  ],
})
export class CitationPageModule {}
