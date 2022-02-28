import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public accessToken!: string | null;
  public name!: string | null;

  constructor() { }

  public destroy(): void {
    this.accessToken = null;
    this.name = null;
  }
}
