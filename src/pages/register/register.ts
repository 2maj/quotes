import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = {
    email: '',
    password: ''
  };

  constructor(public nav: NavController,
              public navParams: NavParams,
              private auth: AuthServiceProvider,
              private alertCrtl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.showPopup("Success", "Account created.");
          //this.nav.setRoot('LoginPage');
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCrtl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
              //this.nav.setRoot('LoginPage');
            }
          }
        }
      ]
    });
    alert.present();
  }

}
