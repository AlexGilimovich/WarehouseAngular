import {WarehouseSchemeService} from "../warehouse-scheme.service";
import {Component, OnInit} from "@angular/core";
import {StorageSpace} from "../storage-space";
import {ActivatedRoute, Router} from "@angular/router";
/**
 * Created by Lenovo on 14.05.2017.
 */
@Component({
  selector: 'app-warehouse-company',
  templateUrl: './warehouse.scheme.component.html',
  styleUrls: ['./warehouse.scheme.component.scss'],
  providers: [WarehouseSchemeService]
})
export class WarehouseSchemeInfoComponent implements OnInit {
  id: number;
  storageSpace: StorageSpace[]=[];

  constructor(private service: WarehouseSchemeService, private router:Router, private route:ActivatedRoute){
    console.log("CHECKED");
    route.params.subscribe(params => { this.id = params['id']; });
    console.log("ID FROM constructor WarehouseSchemeInfoComponent: "+this.id);
  }

  ngOnInit(){
    console.log("open method get data warehouse customer");
    this.service.getStorageSpace(this.id).subscribe(data => {
      this.storageSpace = data;
    });
  }
}
