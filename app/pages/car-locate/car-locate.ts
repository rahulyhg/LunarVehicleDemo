import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams
} from 'ionic-angular';
/*
  Generated class for the CarLocatePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/car-locate/car-locate.html',
})

export class CarLocatePage {
  private car: any;
  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.car = navParams.get('car');
  }
}
