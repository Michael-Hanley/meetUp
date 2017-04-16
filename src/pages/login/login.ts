import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth';
import { ModalController } from 'ionic-angular';
import { ModalPage } from './modal-page';

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
    public modalCtrl: ModalController) {
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

    this.auth.loginWithEmail(this.form).subscribe(data => {
      setTimeout(() => {
        loading.dismiss();
        this.navCtrl.push(TabsPage);
        // The auth subscribe method inside the app.ts will handle the page switch to home
      }, 1000);
    }, err => {
      setTimeout(() => {
        loading.dismiss();
        this.error = err;
      }, 1000);
    });
  }
  presentModal() {
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }

}
