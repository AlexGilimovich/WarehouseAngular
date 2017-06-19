export const MISMATCH_ACT = 'MISMATCH_ACT';
export const ACT_OF_LOSS = 'ACT_OF_LOSS';
export const ACT_OF_THEFT = 'ACT_OF_THEFT';
export const WRITE_OFF_ACT = 'WRITE_OFF_ACT';

export class ActTypes {

  private static actTypes: string[] = [
    MISMATCH_ACT,
    ACT_OF_LOSS,
    ACT_OF_THEFT,
    WRITE_OFF_ACT
  ];

  public static list(): string[] {
    return this.actTypes;
  }

  public static MISMATCH_ACT() {
    return MISMATCH_ACT;
  }

  public static ACT_OF_LOSS() {
    return ACT_OF_LOSS;
  }

  public static ACT_OF_THEFT() {
    return ACT_OF_THEFT;
  }

  public static WRITE_OFF_ACT() {
    return WRITE_OFF_ACT;
  }
}


