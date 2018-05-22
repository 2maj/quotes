import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { LoginPage } from "../login/login";

@NgModule({
  declarations: [
    RegisterPage
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
  ],
  entryComponents: [

  ]
})
export class RegisterPageModule {}
