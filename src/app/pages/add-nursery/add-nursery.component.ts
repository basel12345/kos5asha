import { AuthStorageService } from 'src/app/pages/Service/auth-storage.service';
import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { MainService } from '../Service/main.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-add-nursery',
  templateUrl: './add-nursery.component.html',
  styleUrls: ['./add-nursery.component.scss'],
})
export class AddNurseryComponent implements OnInit {
  nursery = {
    name: null,
    License: null,
    mobile: null,
    telephone: null,
    email: null,
    address: null,
    room: null,
    Capacity: null,
    numberOfNurseries: null,
    watchPrice: null,
    durationContract: null,
    coords: {
      lat: null,
      lng: null,
    },
  };
  map = false;
  user: any;
  id: any;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  constructor(
    private Service: MainService,
    private storage: AuthStorageService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}
  @ViewChild('content') myModal;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  ngOnInit(): void {
    this.user = this.storage.GetCurrentUser();
    if (this.user) {
      this.id = this.user._id;
    }
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      // let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      // autocomplete.addListener("place_changed", () => {
      //   this.ngZone.run(() => {
      //     //get the place result
      //     let place: google.maps.places.PlaceResult = autocomplete.getPlace();

      //     //verify result
      //     if (place.geometry === undefined || place.geometry === null) {
      //       return;
      //     }

      //     //set latitude, longitude and zoom
      //     this.latitude = place.geometry.location.lat();
      //     this.longitude = place.geometry.location.lng();
      //     this.zoom = 12;
      //   });
      // });
    });
  }

  openMap() {
    this.map = true;
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    // this.latitude = $event['coords'].lat;
    // this.longitude = $event['coords'].lng;
    this.getAddress(this.latitude, this.longitude);
  }

  dismiss() {
    this.nursery.coords.lat = this.latitude;
    this.nursery.coords.lng = this.longitude;
    this.nursery.address = this.address;
    this.map = false;
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      this.nursery.address = results[0].formatted_address;
      this.address = results[0].formatted_address;
      this.nursery.coords.lat = latitude;
      this.nursery.coords.lng = longitude;
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  submit(form) {
    if (this.user) {
      if (form.valid) {
        this.Service.addNursery(this.id, this.nursery).subscribe((res) => {
          if (res['status']) {
            form.reset();
            form.submitted = false;
            Swal.fire({
              title: 'success',
              text: 'تمت الاضافة بنجاح',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: res['message'],
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        });
      }
    } else {
      form.submitted = false;
      alert('يجب عليك تسجيل الدخول !');
    }
  }
}
