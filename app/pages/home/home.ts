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

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  private url = "http://cndlunarlocator.herokuapp.com/vehicles/";
  private cars = [];
  private itemSelected(item) {
    console.log(item);
  }

  constructor(private navCtrl: NavController, public http: Http) {
    this.http = http;
console.log(_.VERSION);

    

    this.getCarList();
  }
  private getCarList() {
    for (var i = 0; i < 6; i++) {
      this.http.get(this.url + i + "/locate.json")
        .map(res => res.json())
        .subscribe((response) => {
          this.cars.push(response);
        });
    }
  }
}