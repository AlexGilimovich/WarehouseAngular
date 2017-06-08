import {marker} from "./marker";
import {isUndefined} from "util";
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

  init(data: any[]){
    for (let i = 0; i < data.length; i++) {
      if(isUndefined(data[i].status) || data[i].status) {
        this.object_marker = new marker;
        this.object_marker.name = data[i].name;
        this.object_marker.draggable = true;
        this.object_marker.lat = data[i].x;
        this.object_marker.lng = data[i].y;
        this.markers.push(this.object_marker);
      }
    }

    if(data.length != 0){//init first view/coordinates
      this.lat = this.markers[0].lat;
      this.lng = this.markers[0].lng;
    }

    this.isDataAvailable = true;
  }
}
