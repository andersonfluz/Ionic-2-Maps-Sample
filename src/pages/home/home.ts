import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, Geolocation } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  
  constructor(public navCtrl: NavController, public platform: Platform) {
    platform.ready().then(() => {
            Geolocation.getCurrentPosition().then((resp) => {
              this.loadMap(resp.coords.latitude, resp.coords.longitude);
            }).catch((error) => {
              console.log('Error getting location', error);
            });
        });
  }

  loadMap(lat: number, long: number){
        let location = new GoogleMapsLatLng(lat, long);
        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
  }

}
