import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  constructor() {}

  public projectname = 'Demo service';
  public apihosturl = 'https://localhost:5001';
}
