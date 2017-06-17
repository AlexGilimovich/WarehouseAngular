/**
 * Created by Lenovo on 17.06.2017.
 */

import { Injectable } from '@angular/core';

import { MapsAPILoader } from 'angular2-google-maps/core';

declare let google: any;

@Injectable()
export class MapService {
  private geocoder: any = null;

  constructor(
    private mapsAPILoader: MapsAPILoader,
  ) { }

  public geocoding(address: string): Promise<any> {
    return this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        this.geocoder.geocode({ 'address': address }, (result: any, status: any) => {
          if (status === google.maps.GeocoderStatus.OK) {
            resolve(result);
          } else {
            reject(status);
          }
        });
      });
    });
  }

}
