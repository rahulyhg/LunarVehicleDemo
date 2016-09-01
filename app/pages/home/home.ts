import {
  Component
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';
import {
  Http,
  HTTP_PROVIDERS
} from '@angular/http';
import * as _ from 'lodash';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  private url = "http://cndlunarlocator.herokuapp.com/vehicles/";
  private cars = [];
  private maxCars = 6;
  private itemSelected(item) {
    console.log(item);
  }


  constructor(private navCtrl: NavController, public http: Http) {
    this.http = http;
    this.getCarList();
  }
  private getCarList() {
    var called = 0;
    var classMain = this;
    var allCarsId = _.times(this.maxCars);
    _.each(allCarsId, function(i) {
      classMain.http.get(classMain.url + i + "/locate.json")
        .map(res => res.json())
        .subscribe((response) => {
          if (response.power_level_percent > 75) {
            response.powerClass = "green";
          } else if (response.power_level_percent <= 75 && response.power_level_percent > 50) {
            response.powerClass = "yellow";
          } else if (response.power_level_percent <= 50 && response.power_level_percent > 25) {
            response.powerClass = "orange";
          } else if (response.power_level_percent <= 25) {
            response.powerClass = "red";
          }
          classMain.cars.push(response);
          called++;
          if (called == classMain.maxCars) {
            classMain.cars = _.orderBy(classMain.cars, "name");
          }
        });
    });
  }
}
