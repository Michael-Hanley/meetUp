import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth';
import { ModalController } from 'ionic-angular';
import { Register } from './register/register';
import { DataProvider } from '../../providers/data';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  form: any;
  error: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController, private auth: AuthProvider,
    public modalCtrl: ModalController, private date: DataProvider) {
    this.form = {
      email: '',
      password: ''
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
  onLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    //this.navCtrl.push(TabsPage); //FOR DEVELOPEMENT ONLY
    this.auth.loginWithEmail(this.form).subscribe(data => {
      setTimeout(() => {
        loading.dismiss();
        this.navCtrl.push(TabsPage);
        // The auth subscribe method inside the app.ts will handle the page switch to home
      });
    }, err => {
      setTimeout(() => {
        loading.dismiss();
        this.error = err;
      });
    });
  }
  onFacebookLogin() {
    this.auth.loginWithFacebook().subscribe(data => {
      console.log(data);
    });
  }
  presentModal() {
    let myModal = this.modalCtrl.create(Register);
    myModal.present();
  }

}
