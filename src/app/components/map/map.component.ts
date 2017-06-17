import {Component, Input, OnInit} from "@angular/core";
import {MapService} from "../../util/map.service";
import {MapView} from "../../util/map";

@Component({
  selector: 'google-map-view',
  templateUrl: './map.html',
  styleUrls: ['./map.scss'],
  providers: [MapService]
})

export class MapComponent implements OnInit {
  @Input() private isSmall: boolean;
  @Input() public isViewAction: boolean;
  @Input() private data: any[];
  map: MapView = new MapView(this.mapService);
  address: string;

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    console.log(this.data);
    if(this.data.length > 0) {
      this.map.init(this.data);
    }
  }

  public getStyle(){
    console.log(this.isSmall);
    return this.isSmall? "height: 350px;" : "height: 600px;";
  }
}
