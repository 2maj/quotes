import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { EmailValidator } from "../../providers/auth-service/auth-service";

@IonicPage({
  name: 'page-reset-password'
})
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  resetPasswordForm: FormGroup;
  constructor(public nav: NavController,
              public formBuilder: FormBuilder,
              public authData: AuthServiceProvider,
              public alertCtrl: AlertController) {
    this.resetPasswordForm= formBuilder.group({
      email: ['', Validators.compose(
        [Validators.required, EmailValidator.isValid])
      ]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }
  resetPassword(){
    if (!this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value);
    } else {
      this.authData.resetPassword(this.resetPasswordForm.value.email)
        .then((user) => {
          let alert = this.alertCtrl.create({
            message: "We just sent you a reset link to your email, we hope is valid email",
            buttons: [
              {
                text: "Ok",
                role: 'cancel',
                handler: () => {
                  this.nav.pop();
                }
              }
            ]
          });
          alert.present();
        }, (error) => {
          var errorMessage: string = error.message;
          let errorAlert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          errorAlert.present();
        });
    }
  }

}
