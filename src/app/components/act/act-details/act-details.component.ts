import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Act } from '../act';
import { ActService } from '../act.service';
import { actTypeMessages } from '../act.module';

@Component({
  selector: 'app-act-details',
  templateUrl: './act-details.component.html',
  styleUrls: ['./act-details.component.scss']
})
export class ActDetailsComponent implements OnInit {
  private act: Act;
  private id;
  private actTypeMessages = actTypeMessages;

  constructor(private location: Location,
              private actService: ActService,
              private router: Router,
              private route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.actService.get(this.id).subscribe(
      (res) => {
        this.act = res;
      },
      (err)=> {
        console.error(err);
      }
    )
  }

  private close() {
    this.location.back();
  }

  private goToUserDetails() {
    this.router.navigate(['../../../users/details', this.act.user.id], {relativeTo: this.route});
  }

}
