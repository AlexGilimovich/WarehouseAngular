export const REGISTERED = 'REGISTERED';
export const CHECKED = 'CHECKED';
export const STORED = 'STORED';
export const LOST_BY_TRANSPORT_COMPANY = 'LOST_BY_TRANSPORT_COMPANY';
export const LOST_BY_WAREHOUSE_COMPANY = 'LOST_BY_WAREHOUSE_COMPANY';
export const STOLEN = 'STOLEN';
export const TRANSPORT_COMPANY_MISMATCH = 'TRANSPORT_COMPANY_MISMATCH';
export const SEIZED = 'SEIZED';
export const RECYCLED = 'RECYCLED';
export const WITHDRAWN = 'WITHDRAWN';
export const RELEASE_ALLOWED = 'RELEASE_ALLOWED';
export const MOVED_OUT = 'MOVED_OUT';


export class Statuses {

  private static statuses: string[] = [
    REGISTERED,
    CHECKED,
    STORED,
    LOST_BY_TRANSPORT_COMPANY,
    LOST_BY_WAREHOUSE_COMPANY,
    STOLEN,
    TRANSPORT_COMPANY_MISMATCH,
    SEIZED,
    RECYCLED,
    WITHDRAWN,
    RELEASE_ALLOWED,
    MOVED_OUT
  ];

  public static list(): string[] {
    return this.statuses;
  }

  public static REGISTERED() {
    return REGISTERED;
  }

  public static CHECKED() {
    return CHECKED;
  }

  public static STORED() {
    return STORED;
  }

  public static LOST_BY_TRANSPORT_COMPANY() {
    return LOST_BY_TRANSPORT_COMPANY;
  }

  public static LOST_BY_WAREHOUSE_COMPANY() {
    return LOST_BY_WAREHOUSE_COMPANY;
  }

  public static STOLEN() {
    return STOLEN;
  }

  public static TRANSPORT_COMPANY_MISMATCH() {
    return TRANSPORT_COMPANY_MISMATCH;
  }

  public static SEIZED() {
    return SEIZED;
  }

  public static RECYCLED() {
    return RECYCLED;
  }

  public static WITHDRAWN() {
    return WITHDRAWN;
  }

  public static RELEASE_ALLOWED() {
    return RELEASE_ALLOWED;
  }

  public static MOVED_OUT() {
    return MOVED_OUT;
  }
}


