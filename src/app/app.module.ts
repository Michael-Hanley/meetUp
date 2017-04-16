import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { Register } from '../pages/login/register/register';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

//providers
import { AuthProvider } from '../providers/auth';
import { DataProvider } from '../providers/data';

// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyDEOjtTOneLiCfFvhH3W1r9gtlTCVEc11g",
    authDomain: "meetup-1491637700137.firebaseapp.com",
    databaseURL: "https://meetup-1491637700137.firebaseio.com",
    projectId: "meetup-1491637700137",
    storageBucket: "meetup-1491637700137.appspot.com",
    messagingSenderId: "607823270270"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Login,
    Register
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Login,
    Register
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    DataProvider,
    AuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
