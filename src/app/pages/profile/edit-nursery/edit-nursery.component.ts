import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef, NgZone } from '@angular/core';
import { AuthStorageService } from '../../Service/auth-storage.service';
import Swal from 'sweetalert2';
import { MainService } from '../../Service/main.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../../Service/profile.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-edit-nursery',
  templateUrl: './edit-nursery.component.html',
  styleUrls: ['./edit-nursery.component.scss'],
})
export class EditNurseryComponent implements OnInit {
  @Input() id: any
  nursery = {
    name: null,
    License: null,
    mobile: null,
    telephone: null,
    email: null,
    address: null,
    Capacity: null,
    numberOfNurseries: null,
    watchPrice: null,
    durationContract: null,
    room: null,
    coords: {
      lat: null,
      lng: null,
    },
  };
  map = false;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  constructor(
    private modal: NgbModal,
    private Service: MainService,
    private storage: AuthStorageService,
    private profileService: ProfileService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}
  @ViewChild('content') myModal;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public searchElementRef: ElementRef;

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
    });
    this.profileService.getOneNursery(this.id).subscribe(res => {
      this.nursery.name = res['name'];
      this.nursery.License = res['License'];
      this.nursery.mobile = res['mobile'];
      this.nursery.telephone = res['telephone'];
      this.nursery.email = res['email'];
      this.nursery.address = res['address'];
      this.nursery.Capacity = res['Capacity'];
      this.nursery.numberOfNurseries = res['numberOfNurseries'];
      this.nursery.watchPrice = res['watchPrice'];
      this.nursery.durationContract = res['durationContract'];
      this.nursery.room = res['room'];
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
    this.latitude = $event['coords'].lat;
    this.longitude = $event['coords'].lng;
    this.getAddress(this.latitude, this.longitude);
  }

  dismissMap() {
    this.nursery.coords.lat = this.latitude;
    this.nursery.coords.lng = this.longitude;
    this.nursery.address = this.address;
    this.map = false;
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      this.address = results[0].formatted_address;
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
  dismiss() {
    this.modal.dismissAll();
  }
  submit(form) {
    if (this.storage.GetCurrentUser()) {
      if (form.valid) {
        this.Service.editNursery(this.id, this.nursery).subscribe((res) => {
          if (res['status']) {
            form.reset();
            form.submitted = false;
            Swal.fire({
              title: 'success',
              text: 'تم التعديل بنجاح',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.passEntry.emit(res);
            this.modal.dismissAll();
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
      alert('يجب عليك تسجيل الدخول!');
    }
  }

}
