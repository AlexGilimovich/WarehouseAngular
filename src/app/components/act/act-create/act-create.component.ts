import {Component, OnInit,} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {ActService} from "../act.service";
import {ActTypeName} from "../actTypeName";
import {Act} from "../act";
import {ActType} from "../actType";
import {actTypeMessages} from "../act.module";

@Component({
  selector: 'app-act-create',
  templateUrl: './act-create.component.html',
  styleUrls: ['./act-create.component.scss']
})
export class ActCreateComponent implements OnInit {
  // private act:Act;
  private actTypeNames:ActTypeName[];
  private actTypeMessages = actTypeMessages;
  private actForm:FormGroup;

  constructor(private actService:ActService,
              private location:Location,
              private fb:FormBuilder) {
    // this.act = new Act();
    // this.act.actType = new ActType();
    this.actForm = this.fb.group({
      "actType": ['', Validators.compose([Validators.required])],
      "roles": new FormArray([], Validators.compose([goodsValidator]))
    });
  }

  ngOnInit() {
    this.actService.getActTypes().subscribe(
      (res) => {
        this.actTypeNames = res;
        this.actTypeNames.push(new ActTypeName(null, ''));
      },
      (err)=> {
        console.error(err);
      }
    )
  }

  private close() {
    this.location.back();
  }

}
function goodsValidator(array:FormArray) {
  let errors:any = {};
  let hasSelected:boolean = false;

  array.controls.forEach(
    item=> {
      if (item.value)
        hasSelected = true;
    }
  )
  if (!hasSelected) {
    errors.noRole = true;
  }
  return errors;
}
