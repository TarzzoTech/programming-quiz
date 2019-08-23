import { Injectable } from '@angular/core';
import { Role } from '../models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private role: Role;

  roleSync: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  setRole(role: Role): void {
    this.role = role;
    this.roleSync.next(this.role === Role.ADMIN);
  }

  IsAdmin(): boolean {
    return this.role === Role.ADMIN;
  }
}
