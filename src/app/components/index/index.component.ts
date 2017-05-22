import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  zoom: number = 5;
  lat: number = 48.152047;
  lng: number = 15.134961;

  markers: marker[] = [
    {
      name: ':iTechArt',
      lat: 53.888347,
      lng: 27.544358,
      draggable: true
    },
    {
      name: 'Munatiko',
      lat: 45.775647,
      lng: 1.929985,
      draggable: true
    },
    {
      name: 'PorteLes',
      lat: 47.973980,
      lng: 4.117793,
      draggable: true
    },
    {
      name: 'Gessmen',
      lat: 50.719576,
      lng: 9.343523,
      draggable: true
    },
    {
      name: 'Brendenberg',
      lat: 53.210644,
      lng: 12.155012,
      draggable: true
    },
    {
      name: 'Polske',
      lat: 53.034011,
      lng: 19.498155,
      draggable: true
    },
    {
      name: 'Vengeros',
      lat: 47.538542,
      lng: 18.267145,
      draggable: true
    },
    {
      name: 'Lombarde',
      lat: 45.111921,
      lng: 10.180885,
      draggable: true
    },
    {
      name: 'Dedozku',
      lat: 50.420880,
      lng: 21.761530,
      draggable: true
    },
    {
      name: 'Ternopol',
      lat: 50.156302,
      lng: 25.692615,
      draggable: true
    },
    {
      name: 'Kolin',
      lat: 49.979583,
      lng: 15.014328,
      draggable: true
    },
    {
      name: 'Kluzh',
      lat: 47.129891,
      lng: 23.628412,
      draggable: true
    }
  ]

  constructor() {
  }

  ngOnInit() {
  }
}

//Marker type
interface marker {
 name?: string;
 lat: number;
 lng: number;
 draggable: boolean;
}
