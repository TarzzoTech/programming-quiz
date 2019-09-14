import { Injectable } from '@angular/core';
import { Role } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: Role;
  private name: string;
  private storage = localStorage;

  roleSync: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  nameSync: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() {
    this.init();
  }

  init() {
    const role = this.storage.getItem('role');
    if (role) {
      this.role = JSON.parse(role);
      this.roleSync.next(JSON.parse(role));
    }
    const name = this.storage.getItem('name');
    if (name) {
      this.name = name;
      this.nameSync.next(name);
    }
  }

  setRole(role: Role): void {
    this.role = role;
    this.storage.removeItem('role');
    this.storage.setItem('role', `${role}`);
    this.roleSync.next(this.role);
  }

  IsAdmin(): boolean {
    return this.role === Role.ADMIN;
  }

  setName(name: string): void {
    this.storage.removeItem('name');
    this.storage.setItem('name', name);
    this.name = name;
    this.nameSync.next(name);
  }

  resetAll() {
    this.role = null;
    this.name = '';
    this.roleSync.next(this.role);
    this.nameSync.next(this.name);
    // this.storage.clear();
  }
}
