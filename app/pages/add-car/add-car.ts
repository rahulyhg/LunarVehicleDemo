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
  private form = {
    name: "",
    lat: "",
    long: ""
  };
  constructor(private navCtrl: NavController) {
    this.navCtrl = navCtrl;
  }

  private dataSubmit = function(form) {

    this.navCtrl.push(CarLocatePage, {
      car: {
        name: form.name,
        lat: parseFloat(form.lat),
        long: parseFloat(form.long),
        model:   "Manual",
        power_level_percent:  parseInt("100")
      }
    });
  }


}
