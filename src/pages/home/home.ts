import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";

@IonicPage({
  name: 'page-home'
})
@Component({
  selector: 'page-home',
  templateUrl: '../home.html'
})
export class HomePage {
  username = 'Anonymous';
  email = 'anonymous@quote.com';
  constructor(private nav: NavController,
              private auth: AuthServiceProvider)
  {

    if(this.auth.getUserInfo() !== null){
      let user = this.auth.getUserInfo();
      this.username = user['name'];
      this.email = user['email'];
    }
  }
  logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }

}
