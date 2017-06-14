import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SettingsService {
  private presetChangedSource = new Subject<number>();
  public selectedPresetId$ = this.presetChangedSource.asObservable();

  constructor() {
  }

  public emitEventPresetChanged(presetId: number): void {
    this.presetChangedSource.next(presetId);
  }

}
