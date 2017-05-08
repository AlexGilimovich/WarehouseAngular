import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { ListItemComponent } from "./list/list-item/list-item.component";
import { ListComponent } from "./list/list.component";
import { DetailsComponent } from "./details/details.component";

export const routes: Routes = [
  {
    "path": "",
    "redirectTo": 'list',
    "pathMatch": 'full'
  },
  {
    "path": "list",
    "component": ListComponent
  }, {
    "path": "details/:id",
    "component": DetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ListComponent,
    DetailsComponent,
    ListItemComponent
  ],
  exports: [
    ListComponent,
    DetailsComponent,
    ListItemComponent
  ]
})
export class BookModule { }
