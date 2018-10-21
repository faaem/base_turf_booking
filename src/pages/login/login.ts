import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService }  from "../../services/auth.service";
import { HomePage } from '../home/home'
import { RegistrationPage } from '../registration/registration';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
	loginError: string;
  mobileNumber:any;
  password:any;
  isError:boolean = false;
  message:any;

  constructor(public navCtrl: NavController, public navParams: NavParams , public auth: AuthService, public loadingCtrl: LoadingController) {
  }

goback() {
  this.navCtrl.pop();
}

login() {

  let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/loading.gif" />`,
      duration: 5000
    });
      loading.present();

  if(this.mobileNumber == null || this.mobileNumber == undefined || this.mobileNumber == ""){
    this.isError = true;
    this.message = "Please Enter Correct Mobile number"

  }

  else if(this.password == null || this.password == undefined || this.password == ""){
    this.isError = true;
    this.message = "Please Enter password"

  }
  else{

    let credentials = {
      mobileNumber: this.mobileNumber,
      password: this.password
    };
    this.auth.signInWithEmail(credentials)
      .then(
        () => {
          loading.dismiss();
          this.navCtrl.setRoot(HomePage);
        },
        error => {
          loading.dismiss();
          this.message = error.message;
          this.isError = true;
        }
      );
  }

	}

  clearError(){
    this.isError = false;
    this.message = null;
  }

  signup() {
    this.navCtrl.push(RegistrationPage);
  }

}
