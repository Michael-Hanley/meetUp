import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController  } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DataProvider } from '../../providers/data';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(public navCtrl: NavController,
  public geolocation: Geolocation,
  private data: DataProvider) {

  }
  ionViewDidLoad(){
    this.loadMap();
    this.showMyLocation();
  }

  loadMap(){
   this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });
  }

  showMyLocation() {
    this.geolocation.watchPosition().subscribe((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let marker = new google.maps.Marker({
        map: this.map,
        icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
          new google.maps.Size(22, 22),
          new google.maps.Point(0, 18),
          new google.maps.Point(11, 11)),
        position: latLng
      });
      let content = "<h4>You are here</h4>";
      this.addInfoWindow(marker, content);
    }, (err) => {
      console.log(err);
    });
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  shareMyLocation() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = {latitude: position.coords.latitude, longitude: position.coords.longitude};
      this.data.showMyLocation(latLng);
    }, (err) => {
      console.log(err);
    });
  }
}
