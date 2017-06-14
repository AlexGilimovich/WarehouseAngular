import { Component, OnInit } from '@angular/core';
import { Preset } from './preset';
import { LoginService } from '../login/login.service';
import { User } from '../user/user';
import { UserService } from '../user/user-service.service';
import { Presets } from './PRESETS';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from './settings.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private presets: Preset[];
  private form: FormGroup;


  constructor(private loginService: LoginService,
              private fb: FormBuilder,
              private settingsService: SettingsService,
              private userService: UserService) {
    this.presets = Presets.list();
  }

  ngOnInit() {
    const authenticatedUser: User = this.loginService.getLoggedUser();
    this.form = this.fb.group({
      'preset': [{value: ''}, Validators.required]
    });
    this.form.controls['preset'].setValue(authenticatedUser.presetId);
  }

  private savePreset(form: FormGroup): void {
    const authenticatedUser: User = this.loginService.getLoggedUser();
    const selectedPresetId: number = form.controls['preset'].value;

    this.userService.savePreset(authenticatedUser.id, selectedPresetId).subscribe(res => {
      authenticatedUser.presetId = selectedPresetId;
      form.controls['preset'].setValue(selectedPresetId);
      this.settingsService.emitEventPresetChanged(selectedPresetId);
    }, error => {
      console.error(error);
    });
  }

}
