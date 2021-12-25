export class AppUser {
  constructor(
    public username: string,
    public token: string,
    public tokenType: string,
    public expirationDate: Date
  ) {}
}
