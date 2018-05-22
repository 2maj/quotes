import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';


const config = {
  apiKey: "AIzaSyA1k6qbXcB95in0MOtCVf1C16WKvH3zLnA",
  authDomain: "quote-1234.firebaseapp.com",
  databaseURL: "https://quote-1234.firebaseio.com",
  projectId: "quote-1234",
  storageBucket: "quote-1234.appspot.com",
  messagingSenderId: "122004307228"
};

@NgModule({
  declarations: [
    MyApp,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthServiceProvider,
    FirebaseProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
