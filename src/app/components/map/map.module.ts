/**
 * Created by Lenovo on 17.06.2017.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {MapComponent} from "./map.component";
import {MapService} from "../../util/map.service";

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  declarations: [MapComponent],
  providers: [MapService],
  exports: [MapComponent]
})
export class MapModule { }
