import {
  Component,
  ViewChild,
  ElementRef
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


declare var google;

@Component({
  templateUrl: 'build/pages/car-locate/car-locate.html',
})

export class CarLocatePage {
  private car: any;

  private getNormalizedCoord = function(coord, zoom) {
    var y = coord.y;
    var x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across y-axis (vertically)
    if (y < 0 || y >= tileRange) {
      return null;
    }

    // repeat across x-axis
    if (x < 0 || x >= tileRange) {
      x = (x % tileRange + tileRange) % tileRange;
    }

    return {
      x: x,
      y: y
    };
  }

  private cndCenterPosition = {
    lat: 0.681400,
    lng: 23.460550
  }

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.car = navParams.get('car');


        function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
          var R = 1738; // Radius of the moon in km
          var dLat = deg2rad(lat2 - lat1); // deg2rad below
          var dLon = deg2rad(lon2 - lon1);
          var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c; // Distance in km
          return d.toFixed(2);
        }

        function deg2rad(deg) {
          return deg * (Math.PI / 180)
        }

    var distance  = getDistanceFromLatLonInKm(this.car.lat, this.car.long, this.cndCenterPosition.lat, this.cndCenterPosition.lng);
    console.log(distance);
    this.car.distance = getDistanceFromLatLonInKm(this.car.lat, this.car.long, this.cndCenterPosition.lat, this.cndCenterPosition.lng);
  }

  @ViewChild('map') mapElement: ElementRef;
  private map: any;

  ionViewLoaded() {
    this.loadMap(this.car.lat, this.car.long);
  }


  loadMap(lat, lng) {
    var mainClass = this;
    var carLatLong = {
      lat: lat,
      lng: lng
    };
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: carLatLong,
      zoom: 10,
      streetViewControl: false,
      mapTypeControlOptions: {
        mapTypeIds: ['moon']
      }
    });

    var moonMapType = new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
        var normalizedCoord = mainClass.getNormalizedCoord(coord, zoom);
        if (!normalizedCoord) {
          return null;
        }
        var bound = Math.pow(2, zoom);
        return '//mw1.google.com/mw-planetary/lunar/lunarmaps_v1/clem_bw' +
          '/' + zoom + '/' + normalizedCoord.x + '/' +
          (bound - normalizedCoord.y - 1) + '.jpg';
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 9,
      minZoom: 0,
      radius: 1738000,
      name: 'Moon'
    });



    this.map.mapTypes.set('moon', moonMapType);
    this.map.setMapTypeId('moon');
    var carIcon = 'build/img/carIcon.png';
    var officeIcon = 'build/img/officeIcon.png';
    var car = new google.maps.Marker({
      position: carLatLong,
      map: this.map,
      title: this.car.name,
      icon: carIcon
    });

    var office = new google.maps.Marker({
      position: mainClass.cndCenterPosition,
      map: this.map,
      title: 'CND Command Centre',
      icon: officeIcon
    });


    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
}
