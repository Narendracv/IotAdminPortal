export class User {
  constructor() {}
  public id: number;
  public name: string;
  public username: string;
  public passwordHash: string;
  public email: string;
  public phone: string;
  public branchID: number;
  public roleId: number;
  public organizationID: number;
  public businessTypeID: number;

  public branchName: string;
  public isActive: boolean;
  public isDeleted: boolean;
}
