import {
  Component
} from '@angular/core';
import * as _ from 'lodash';
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
    if (_.isNaN(parseFloat(form.lat))) {
      form.lat = 0;
    }
    if (_.isNaN(parseFloat(form.long))) {
      form.long = 0;
    }
    if (form.name == "") {
      form.name = "Custom Vehicle";
    }
    this.navCtrl.push(CarLocatePage, {
      car: {
        name: form.name,
        lat: parseFloat(form.lat),
        long: parseFloat(form.long),
        model:   "Manual",
        power_level_percent:  100
      }
    });
  }


}
