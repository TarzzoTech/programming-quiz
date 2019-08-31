import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {}

  validateEmail(email: string): boolean {
    return email === User.EmailId;
  }

  validatePwd(pwd: string) {
    return bcrypt.compare(pwd, User.PwdHash);
  }

  insertData() { }

  deleteData() {}

  deleteRecord() {}
}
