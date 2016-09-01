import {
  Component
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/about/about.html'
})

export class AboutPage {
  private items: any;
  
  constructor(private navCtrl: NavController) {
    this.items = [0,1,2,3,4,5];
  }
}