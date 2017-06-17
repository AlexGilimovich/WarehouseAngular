import {marker} from "./marker";
import {isUndefined} from "util";
import {MapService} from "./map.service";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operator/map";
/**
 * Created by Lenovo on 08.06.2017.
 */

export class MapView {
  markers: marker[] = [];
  object_marker: marker = new marker;
  isDataAvailable: boolean = false;

  zoom: number = 5;
  lat: number = 48.152047;
  lng: number = 15.134961;

  constructor(public mapService: MapService) {
  }

  current_coord: marker = new marker;

  init(data: any[]) {
    for (let i = 0; i < data.length; i++) {
      if (isUndefined(data[i].status) || data[i].status) {
        this.object_marker = new marker;
        this.object_marker.name = data[i].name;
        this.object_marker.draggable = false;
        this.object_marker.lat = data[i].x;
        this.object_marker.lng = data[i].y;
        this.markers.push(this.object_marker);
      }
    }

    if (data.length != 0) {//init first view/coordinates
      this.lat = this.markers[0].lat;
      this.lng = this.markers[0].lng;
    }

    this.isDataAvailable = true;
  }

  public mapClicked($event: any) {
    this.current_coord.lat = $event.coords.lat;
    this.current_coord.lng = $event.coords.lng;
    this.markers.push(this.current_coord);
    console.log(this.current_coord);
  }

  public getX() {
    return this.current_coord.lat;
  }

  public getY() {
    return this.current_coord.lng;
  }

  public getAddress() {
    return this.current_coord.address;
  }

  public setOneCoordinate(x: number, y:number){
    this.current_coord.lat = x;
    this.current_coord.lng = y;
    this.lat = this.current_coord.lat;
    this.lng = this.current_coord.lng;
    this.markers.push(this.current_coord);
  }

  public getCoordByAddress(address: string) {
    this.mapService.geocoding(address).then(
      rtn => {
        this.current_coord.address = rtn[0].formatted_address;
        let location = rtn[0].geometry.location;
        this.current_coord.lat = location.lat();
        this.current_coord.lng = location.lng();
        this.lat = this.current_coord.lat;
        this.lng = this.current_coord.lng;
        this.markers.push(this.current_coord);
      }
    );
  }
}
