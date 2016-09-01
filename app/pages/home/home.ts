import {
  Component
} from '@angular/core';
import {
  NavController,
  PopoverController
} from 'ionic-angular';
import {
  Http,
  HTTP_PROVIDERS
} from '@angular/http';
import * as _ from 'lodash';
import {
  CarLocatePage
} from '../car-locate/car-locate';
import {
  AddCarPage
} from '../add-car/add-car';

@Component({
  templateUrl: 'build/pages/home/home.html'
})



export class HomePage {
  private url = "http://cndlunarlocator.herokuapp.com/vehicles/";
  // private url = "http://localhost:8100/demo.json#/";
  private cars = [];
  private maxCars = 6;
  private itemSelected(item) {
    this.navCtrl.push(CarLocatePage, {
      car: item
    });
  }


  constructor(private navCtrl: NavController, public http: Http, public popoverCtrl: PopoverController) {
    this.http = http;
    this.getCarList(null);
    this.navCtrl = navCtrl;
    this.popoverCtrl = popoverCtrl;

  };

  private doRefresh = function(refresher) {
    this.getCarList(refresher);
  };

  private presentPopover = function(myEvent) {
    // let popover = this.popoverCtrl.create(AddCarPage);
    // popover.present({
    //   ev: myEvent
    // });
    this.navCtrl.push(AddCarPage);
  }

  private getCarList(refresher) {
    var called = 0;
    var classMain = this;
    classMain.cars = [];
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
            if (refresher) {
              refresher.complete();
            }
            classMain.cars = _.orderBy(classMain.cars, "name");
          }
        });
    });
  }
}
