import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { FormControl } from "@angular/forms";
import 'rxjs/add/operator/map';


export class User{
  name: string;
  email: string;
  constructor(public nom: string,
              public mail: string ) {
    this.name = nom;
    this.email = mail;

  }
}

export class EmailValidator {
  static isValid(control: FormControl) {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
      control.value
    );

    if (re) {
      return null;
    }

    return {
      invalidEmail: true,
    };
  }
}
@Injectable()
export class AuthServiceProvider {
  currentUser: User;
  constructor( private augularFireAuth: AngularFireAuth ) {
    console.log('Hello AuthServiceProvider Provider');

  }
  login(credentials){
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!

        //let access = (credentials.password === "admin1" && credentials.email === "adjimahamat@gmail.com");
        let access = this.augularFireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
        //Check in database corresponding email-name
        this.currentUser = new User('Moussa', credentials.email);
        observer.next(access);
        observer.complete();
      });
    }
  }
  register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      this.augularFireAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(createdUser => {
          console.log('Create user ', createdUser);
        })
        .catch( error => console.error(error.message));
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  getUserInfo(): User {
    return this.currentUser;
  }

  logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  resetPassword(email: string): Promise<void> {
    return this.augularFireAuth.auth.sendPasswordResetEmail(email);
  }

}
