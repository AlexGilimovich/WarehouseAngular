export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_OWNER = 'ROLE_OWNER';
export const ROLE_SUPERVISOR = 'ROLE_SUPERVISOR';
export const ROLE_MANAGER = 'ROLE_MANAGER';
export const ROLE_CONTROLLER = 'ROLE_CONTROLLER';
export const ROLE_DISPATCHER = 'ROLE_DISPATCHER';


export class Roles {

  private static roles: string[] = [
    ROLE_ADMIN,
    ROLE_OWNER,
    ROLE_SUPERVISOR,
    ROLE_MANAGER,
    ROLE_CONTROLLER,
    ROLE_DISPATCHER
  ];

  public static list(): string[] {
    return this.roles;
  }

  public static ROLE_ADMIN() {
    return ROLE_ADMIN;
  }
  public static ROLE_OWNER() {
    return ROLE_OWNER;
  }
  public static ROLE_SUPERVISOR() {
    return ROLE_SUPERVISOR;
  }
  public static ROLE_MANAGER() {
    return ROLE_MANAGER;
  }
  public static ROLE_CONTROLLER() {
    return ROLE_CONTROLLER;
  }
  public static ROLE_DISPATCHER() {
    return ROLE_DISPATCHER;
  }

}


