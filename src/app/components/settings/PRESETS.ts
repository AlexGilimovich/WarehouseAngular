import { Preset } from './preset';

export class Presets {
  private static presets: Preset[] = [
    new Preset(1, 'Light'),
    new Preset(2, 'Dark')
  ];

  public static list(): Preset[] {
      return this.presets;
  }
}


