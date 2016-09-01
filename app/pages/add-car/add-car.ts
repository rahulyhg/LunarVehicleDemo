import {
  Component
} from '@angular/core';

import {
  NavController
} from 'ionic-angular';
import {
  CarLocatePage
} from '../car-locate/car-locate';

/*
  Generated class for the AddCarPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/add-car/add-car.html',
})
export class AddCarPage {

  constructor(private navCtrl: NavController) {
    this.navCtrl = navCtrl;
  }

  private dataSubmit = function() {
    console.log(this.newCarForm.value);
    // this.navCtrl.push(CarLocatePage, {
    //
    //   car: {
    //     name: this.name,
    //     lat: this.lat,
    //     long: this.long
    //   }
    // });
  }


}
