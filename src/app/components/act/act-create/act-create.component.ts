import {Component, OnInit} from "@angular/core";
import {Location} from "@angular/common";
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {ActService} from "../act.service";
import {ActTypeName} from "../actTypeName";
import {actTypeMessages} from "../act.module";
import {ActDTO} from "../ActDTO";

@Component({
  selector: 'app-act-create',
  templateUrl: './act-create.component.html',
  styleUrls: ['./act-create.component.scss']
})
export class ActCreateComponent implements OnInit {
  private actTypeNames:ActTypeName[];
  private goodsIdList;//todo
  private actTypeMessages = actTypeMessages;
  private actForm:FormGroup;

  constructor(private actService:ActService,
              private location:Location,
              private fb:FormBuilder) {
    // this.act = new Act();
    // this.act.actType = new ActType();
    this.actForm = this.fb.group({
      "actType": ['', Validators.compose([Validators.required])],
      "goods": new FormArray([], Validators.compose([goodsValidator]))

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

  private save() {
    let act:ActDTO = new ActDTO();
    act.type = this.actForm.controls['actType'].value;
    act.goodsList = this.actForm.controls['goods'].value;
    this.actService.save(act).subscribe(
      res=> {
        this.location.back();
      },
      error=>{
        this.location.back();
      }
    )
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
