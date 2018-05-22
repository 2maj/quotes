import { Component } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";


@IonicPage({
  name: 'page-login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {
    email: '',
    password: ''
  };
  constructor(private nav: NavController,
              public navParams: NavParams,
              private auth: AuthServiceProvider,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  createAccount() {
    this.nav.push('RegisterPage');
  }
  resetPassword(){
    this.nav.push('page-reset-password');
  }
  continiousAsAnonymous(){
    this.nav.push('page-home');
  }

 login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(allowed => {
        if (allowed) {
          this.nav.push('page-home');
        } else {
          this.showError("Access Denied");
        }
      },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    //alert.present(prompt('Erreur show !'));
  }


}
