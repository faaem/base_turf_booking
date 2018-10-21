import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OtpPage } from '../otp/otp';


@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  signupForm: FormGroup;
  warningMessage: boolean = false;
  validityWarningMessage: boolean = false;
  succSignupMessage: boolean = false;
  errSignupMessage: boolean = false;
  errMsgSignupFullname: boolean = false;
  errMsgSignupEmail: boolean = false;
  errMsgSignupPwd: boolean = false;
  errMsgSignupMob: boolean = false;
  errMessage: any;
  counter: boolean = false;
  passwordDonotMatch: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.signupForm = formBuilder.group({
      username: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      cpassword: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      mobile: ['', Validators.compose([Validators.minLength(10),
      Validators.maxLength(20), Validators.pattern('[0-9]*'), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  goback() {
    this.navCtrl.pop();
  }

  clearError(){
    this.errSignupMessage = false;
    this.errMessage = "";
  }

  userSignup(form: NgForm) {

    this.succSignupMessage = false;
    this.errSignupMessage = false;
    this.counter = false

    if (!this.signupForm.controls.username.valid) {
      this.errMsgSignupFullname = true;
      this.counter = true;
    }

    if (!this.signupForm.controls.password.valid) {
      this.errMsgSignupPwd = true;
      this.counter = true;
    }

    if (!this.signupForm.controls.mobile.valid) {
      this.errMsgSignupMob = true;
      this.counter = true;
    }

    if (form.value.password !== form.value.cpassword) {
      this.passwordDonotMatch = true;
      this.counter = true;
    }

    if (!this.counter && form.value.password && form.value.username && form.value.mobile) {
      this.warningMessage = false;
      if (this.signupForm.controls.password.valid && this.signupForm.controls.username.valid
         && this.signupForm.controls.mobile.valid) {
  this.navCtrl.push(OtpPage, {
     name: form.value.username,
     mobileNumber: form.value.mobile,
     password: form.value.password
   });
      } else {
        this.validityWarningMessage = true;
      }
    }
  }


}
