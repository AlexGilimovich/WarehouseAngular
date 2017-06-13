import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Preset } from './components/settings/preset';
import { LoginService } from './components/login/login.service';
import { User } from './components/user/user';
import { Presets } from './components/settings/PRESETS';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  private selectedPresetId: number;
  private presets: Preset[] = Presets.list();

  constructor(private loginService: LoginService) {

  }

  ngOnInit() {
    const authenticatedUser: User = this.loginService.getLoggedUser();
    // this.selectedPresetId = authenticatedUser.presetId; todo uncomment
    this.selectedPresetId = 1;
  }

}
