import { Component, OnInit } from '@angular/core';
import { Preset } from './preset';
import { LoginService } from '../login/login.service';
import { User } from '../user/user';
import { UserService } from '../user/user-service.service';
import { Presets } from './PRESETS';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private presets: Preset[];
  private selectedPresetId: number;

  constructor(private loginService: LoginService,
              private userService: UserService) {
    this.presets = Presets.list();
  }

  ngOnInit() {
    const authenticatedUser: User = this.loginService.getLoggedUser();
    // this.selectedPresetId = authenticatedUser.presetId; todo uncomment
    this.selectedPresetId = 1;
  }

  private savePreset() {
    const authenticatedUser: User = this.loginService.getLoggedUser();
    this.userService.savePreset(authenticatedUser.id, this.selectedPresetId).subscribe(res => {

    }, error => {
      console.error(error);
    });
  }

}
