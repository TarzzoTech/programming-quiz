import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { pwdHash } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {}

  validateEmail(email: string): boolean {
    return email === 'admin@pq.com';
  }

  validatePwd(pwd: string) {
    return bcrypt.compare(pwd, pwdHash);
  }

  insertData() { }

  deleteData() {}

  deleteRecord() {}
}
