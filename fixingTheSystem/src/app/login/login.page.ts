import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController) { 
  }

  ngOnInit() {
  }

  username;

  loginAttempt() {
    if ((this.username == "rommele") || (this.username == "goringh")) {
      console.log("Yeah baby, yeah")
      this.navCtrl.navigateForward('/teacher-user/'+this.username);  
    }
    else {
      this.navCtrl.navigateForward('/mobile-user/'+this.username);  
    }   
  }
  saveOurSouls() {
    this.navCtrl.navigateForward('/info');
  }

}
