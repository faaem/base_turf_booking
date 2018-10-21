import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService }  from "../../services/auth.service";
import { HomePage } from "../home/home";




@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {
name:any;
mobileNumber:any;
password:any;
otp:any;
isError:boolean = false;
message: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService, public loadingCtrl: LoadingController) {

    this.name = navParams.get('name');
    this.mobileNumber = navParams.get('mobileNumber');
    this.password = navParams.get('password');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpPage');
  }

  goback() {
    this.navCtrl.pop();
  }

  clearErrorMsg(){
    this.isError = false;
    this.message = null;
  }

  verifyOtp(){

    if(this.otp === "1234"){
      this.SignUpWithCredentials();

    }
    else{
      this.isError = true;
      this.message = "Invalid OTP!!! Please Enter Correct Otp"
    }
  }

  SignUpWithCredentials(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
        loading.present();
    		let credentials = {
    			email: this.mobileNumber+"~@baseturf.co.com",
    			password: this.password
    		};
    		this.auth.signUp(credentials).then(
    			() =>{
            loading.dismiss();
            this.navCtrl.setRoot(HomePage);
          }
          ,
    			error => {
            loading.dismiss();
            this.message = error.message;
          }
    		);
    }


}
