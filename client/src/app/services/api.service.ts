import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {}

  validateEmail(email: string): boolean {
    return email === 'admin@pq.com';
  }

  validatePwd(pwd: string): boolean {
    return true;
  }

  insertData() { }

  deleteData() {}

  deleteRecord() {}
}
